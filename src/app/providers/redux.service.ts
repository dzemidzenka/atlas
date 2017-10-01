import { Injectable, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// import { ACTION, COUNTRY, IStateModel, IActionModel, IUserModel, IMenuModel } from '../models/models';
import * as models from '../models/models';
// import { LOCAL_STORAGE_NAME_PROVIDER } from '../providers/tokens';
import * as tokens from '../providers/tokens';

import sortBy from 'lodash-es/sortBy';
import sortedUniq from 'lodash-es/sortedUniq';
import cloneDeep from 'lodash-es/cloneDeep';
import isEmpty from 'lodash-es/isEmpty';

import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';


@Injectable()
export class ReduxService {
  constructor(
    // @Inject(LOCAL_STORAGE_NAME_PROVIDER) private _localStorageName,
    private _router: Router,
  ) {
    // INITIALIZE REDUCER FUNCTIONS
    this._initReducers();

    // generateAdditionalRoutes(this._router.config);

    // // DERIVE MENU FROM THE ROUTES
    // this._menu = this._router.config
    //   .filter(route => route.hasOwnProperty('data'))
    //   .filter(route => route.data.hasOwnProperty('name'))
    //   .map(menuItemFromRoute)
    //   .map((menu: models.IMenuModel, i) => { menu.id = i + 1; return menu; });        // assign menu item ID


    // SUBSCRIBE TO REDUX STATE - nessesary to maintain at least one subscription active while the app is running
    this.state$.subscribe(state => {
      console.log('Redux state', state);
      // localStorage.setItem(this._localStorageName, JSON.stringify(state));
    });
  }


  private _currentState: models.IStateModel;
  private _menu: Array<models.IMenuModel>;
  private _reducers: Array<Function> = [];
  private _actionSubject$ = new Subject<models.IActionModel>();
  private _initialState: models.IStateModel = (function () {
    let state: models.IStateModel;
    // if (this._localStorageName) {
    //   state = JSON.parse(localStorage.getItem(this._localStorageName));
    // }
    if (!state) {
      state = {} as models.IStateModel;
    }
    return state;
  }).bind(this)();





  // ROUTING EVENTS HANDLER
  private _routerEvents$ = this._router.events
    .filter(event => event instanceof NavigationEnd)
    // .do(event => console.log(this._router))
    .map(event => {
      const url = event['urlAfterRedirects'];
      const urlTree = this._router.parseUrl(url);
      const urlParams = url.split('/').filter(param => param !== '').map(param => param.split('?')[0]);
      const queryParams = urlTree.queryParams;
      return Object.assign({ op: models.ACTION.ROUTE, url: url, urlParams: urlParams, queryParams: queryParams });
    });





  // APPLICATION STATE STORE
  state$: Observable<models.IStateModel> = this._actionSubject$
    .merge(this._routerEvents$)
    .scan((state: models.IStateModel, action: models.IActionModel) => this._reducer(state, action), this._initialState)
    .do(state => this._currentState = state)
    .publishBehavior({})
    .refCount() as Observable<models.IStateModel>;




  // REDUCER HANDLER
  private _reducer(state: models.IStateModel, action: models.IActionModel) {
    const _state = cloneDeep(state);
    if (action.op in models.ACTION) {
      const _action = cloneDeep(action);
      this._reducers[_action.op].call(this, _state, _action);
      _state.action = _action;
    }
    return _state;
  }



  // REDUCERS
  private _initReducers() {
    this._reducers[models.ACTION.LOGIN] = (state: models.IStateModel, action: models.IActionModel) => {
      state.user = action.user;
      generateAdditionalRoutes(this._router.config);

      // DERIVE MENU FROM THE ROUTES
      state.menu = this._router.config
        .filter(route => route.hasOwnProperty('data'))
        .filter(route => route.data.hasOwnProperty('name'))
        .map(menuItemFromRoute)
        .map((menu: models.IMenuModel, i) => { menu.id = i + 1; return menu; });        // assign menu item ID
    };


    this._reducers[models.ACTION.LOGOUT] = (state: models.IStateModel, action: models.IActionModel) => {
      state.user = {} as models.IUserModel;
    };


    this._reducers[models.ACTION.LANGUAGE] = (state: models.IStateModel, action: models.IActionModel) => {
      state.language = action.language;
    };


    this._reducers[models.ACTION.MENU_VIEW_TCODE] = (state: models.IStateModel, action: models.IActionModel) => {
      state.menuViewTcode = !state.menuViewTcode;
      getActiveMenu(state);
    };


    this._reducers[models.ACTION.MENU_FAVORITE_ADD] = (state: models.IStateModel, action: models.IActionModel) => {
      state.menu
        .filter(menu => menu.id === action.menuItem.id)
        .map(menu => menu.isFavorite = true);
      getActiveMenu(state);
    };


    this._reducers[models.ACTION.MENU_FAVORITE_REMOVE] = (state: models.IStateModel, action: models.IActionModel) => {
      state.menu
        .filter(menu => menu.id === action.menuItem.id)
        .map(menu => menu.isFavorite = false);
      getActiveMenu(state);
    };


    this._reducers[models.ACTION.ROUTE] = (state: models.IStateModel, action: models.IActionModel) => {
      state.url = action.url;
      state.urlParams = action.urlParams.filter(param => param.length > 0).map(param => param.toLowerCase());
      state.queryParams = action.queryParams;
      state.view = state.queryParams['view'];
      state.country = state.urlParams[0];
      if (state.country === 'undefined') {
        state.country = undefined;
      }
      if (!state.menuRecent) {
        state.menuRecent = [];
      }

      // add to recent if a component is called (not a folder)
      const _urlParams = [...state.urlParams];
      _urlParams[0] = ':country';
      const _routerPath = _urlParams.join('/');
      if (!state.menuRecent.some(recent => recent === _routerPath)) {
        if (state.menu.some(menu => menu.isComponent === true && menu.routerPath === _routerPath)) {
          state.menuRecent.unshift(_routerPath);
        }
        state.menuRecent = state.menuRecent.slice(0, 4);     // keep at most 5 recent items
      }

      // if (!state.menu) {
      //   state.menu = this._menu;
      // }
      getActiveMenu(state);
    };
  }


  // REDUX ACTIONS
  actionLogIn(user: models.IUserModel) {
    this._actionSubject$.next(Object.assign({ op: models.ACTION.LOGIN, user: user }));
  }

  actionLogOut() {
    this._actionSubject$.next(Object.assign({ op: models.ACTION.LOGOUT }));
  }

  actionViewTcode() {
    this._actionSubject$.next(Object.assign({ op: models.ACTION.MENU_VIEW_TCODE }));
  }

  actionFavoriteAdd(menuItem: models.IMenuModel) {
    this._actionSubject$.next(Object.assign({ op: models.ACTION.MENU_FAVORITE_ADD, menuItem: menuItem }));
  }

  actionFavoriteRemove(menuItem: models.IMenuModel) {
    this._actionSubject$.next(Object.assign({ op: models.ACTION.MENU_FAVORITE_REMOVE, menuItem: menuItem }));
  }

  // current state getter to prevent direct state update
  getCurrentState(): models.IStateModel {
    return this._currentState;
  }
}




// ***********************************************************************
// UTILITY FUNCTIONS
// ***********************************************************************
function menuItemFromRoute(route, i, routes) {
  const params = route.path.split('/');

  let tcode;
  if (route.hasOwnProperty('data') && route.data.hasOwnProperty('isComponent')) {
    tcode = params[params.length - 1];
  }

  return {
    urlParams: params,
    routerPath: route.path,
    tcode: tcode,
    ...route.data,
  };
}



// determine which menus are active per current URL params
function getActiveMenu(state: models.IStateModel) {

  // get active
  state.menu
    .map(item => {
      item.active = false;
      if (state.view === models.VIEW.FAVORITE) {
        item.active = item.isFavorite;
        return item;
      }
      if (state.view === models.VIEW.RECENT) {
        if (state.hasOwnProperty('menuRecent')) {
          item.active = state.menuRecent.some(menuItem => menuItem === item.routerPath);
        }
        return item;
      }
      if (state.menuViewTcode) {                  // if tcode view, then do not show any folders
        item.active = item.isComponent;
        return item;
      }

      // e.g. if URL is /, then menus for /:country/ are allowed
      // e.g. if URL is /:country, then menus for /:country/xxx are allowed
      // e.g. if URL is /:country/xxx, then menus for /:country/xxx/yyy are allowed
      if (item.urlParams.length === state.urlParams.length + 1) {
        item.active = true;
      } else {
        item.active = false;
        return item;
      }

      // match URL params and menu params
      if (state.country) {
        item.urlParams[0] = state.country;

        let i = 0;
        for (const param of state.urlParams) {
          if (item.urlParams[i] !== state.urlParams[i]) {
            item.active = false;
            break;
          }
          i++;
        }
      }
      return item;
    });
  // console.log('ACTIVE_MENU', state.menu);
}




function generateAdditionalRoutes(routes) {

  const _routes = routes;
  // create a route for each country
  Object.keys(models.COUNTRY)
    .map(country => country.toLowerCase())
    .forEach(country => _routes.push(
      {
        path: country.toLowerCase(),
        loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
        canActivate: [],
        resolve: {},
        data: { name: country.toUpperCase() },
      }));

  _routes.push(
    {
      path: '**',
      redirectTo: 'us/page-not-found',
    }
  );
  // routes = sortBy(_routes, 'path');           // cannot sort as configured route priority is very important
  console.log('ROUTES', _routes);
}
