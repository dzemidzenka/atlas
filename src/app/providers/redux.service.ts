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

    generateAdditionalRoutes(this._router.config);

    // DERIVE MENU FROM THE ROUTES
    this._menu = this._router.config
      .filter(route => route.path !== '')
      .filter(route => route.path !== ':country')
      .filter(route => route.path !== ':country/signin')
      .filter(route => route.path !== ':country/page-not-found')
      .filter(route => route.path !== '**')
      // .filter(route => route.hasOwnProperty('canActivate'))
      // .filter(route => route.hasOwnProperty('resolve'))
      .filter(route => (route.hasOwnProperty('data') && route.data.hasOwnProperty('active')) ? route.data.active : true)
      .map(menuItemFromRoute)
      .map((menu: models.IMenuModel, i) => { menu.id = i + 1; return menu; });

    // generateAdditionalMenu(this._MENU);

    // SUBSCRIBE TO REDUX STATE - nessesary to maintain at least one subscription active while the app is running
    this.state$.subscribe(state => {
      console.log('Redux state', state);
      // localStorage.setItem(this._localStorageName, JSON.stringify(state));
    });
  }


  private _country: string;
  private _urlParams: Array<string>;
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
    .map(event => Object.assign({ op: models.ACTION.ROUTE, urlParams: event['urlAfterRedirects'].split('/') }));





  // APPLICATION STATE STORE
  state$: Observable<models.IStateModel> = this._actionSubject$
    .merge(this._routerEvents$)
    // .filter(action => action.hasOwnProperty('op'))
    .scan((state: models.IStateModel, action: models.IActionModel) => this._reducer(state, action), this._initialState)
    // .filter(state => Object.keys(state).length > 0)
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
    };


    this._reducers[models.ACTION.LOGOUT] = (state: models.IStateModel, action: models.IActionModel) => {
      state.user = {} as models.IUserModel;
    };


    this._reducers[models.ACTION.LANGUAGE] = (state: models.IStateModel, action: models.IActionModel) => {
      state.language = action.language;
    };


    this._reducers[models.ACTION.MENU_VIEW_TCODE] = (state: models.IStateModel, action: models.IActionModel) => {
      state.menuTcodeView = !state.menuTcodeView;
      getActiveMenu(state);
    };


    this._reducers[models.ACTION.ROUTE] = (state: models.IStateModel, action: models.IActionModel) => {
      this._urlParams = state.urlParams = action.urlParams.filter(param => param.length > 0).map(param => param.toLowerCase());
      this._country = state.country = this._urlParams[0];
      if (this._country === 'undefined') {
        this._country = state.country = undefined;
      }
      if (!state.menu) {
        state.menu = this._menu;
        // state.menu = cloneDeep(this._menu);
      }
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

  actionTcodeView() {
    this._actionSubject$.next(Object.assign({ op: models.ACTION.MENU_VIEW_TCODE }));
  }

  // getters to private properties to prevent direct writes
  getCountry(): string {
    return this._country;
  }
  getUrlParams(): Array<string> {
    return this._urlParams;
  }
  getMenu(): Array<models.IMenuModel> {
    return this._menu;
  }
}




// ***********************************************************************
// UTILITY FUNCTIONS
// ***********************************************************************
function menuItemFromRoute(route, i, routes) {
  const params = route.path.split('/');

  let isComponent;
  let tcode;
  if (route.hasOwnProperty('data') && route.data.hasOwnProperty('isComponent')) {
    isComponent = true;
    tcode = params[params.length - 1];
  }

  return {
    urlParams: params,
    routerPath: route.path,
    ...route.data,
    isComponent: isComponent,
    tcode: tcode,
  };
}



// determine which menus are active per current URL params
function getActiveMenu(state: models.IStateModel) {

  // get active
  state.menu.map(item => {
    // if flat view, then do not show any folders
    item.active = false;
    if (state.menuTcodeView) {
      item.active = item.isComponent;
      return;
    }

    // e.g. if URL is /, then menus for /:country/ are allowed
    // e.g. if URL is /:country, then menus for /:country/xxx are allowed
    // e.g. if URL is /:country/xxx, then menus for /:country/xxx/yyy are allowed
    if (item.urlParams.length === state.urlParams.length + 1) {
      item.active = true;
    } else {
      item.active = false;
      return;
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
  });
  console.log('ACTIVE_MENU', state.menu);
}



// function generateAdditionalMenu(menu) {

//   const _menu = [];

//   // create a menu for each country
//   Object.keys(COUNTRY)
//     .map(country => country.toLowerCase())
//     .forEach(country => _menu.push(
//       {
//         urlParams: [country.toLowerCase()],
//         active: true,
//         name: country.toUpperCase(),
//         id: 0,
//       }));
//   menu.push(..._menu);
//   // menu.push({
//   //   urlParams: ['us', 'atlas'],
//   //   active: true,
//   //   name: 'Settings',
//   //   id: 0,
//   // });
// }





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
        data: {
          active: true,
          name: country.toUpperCase(),
        },
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
