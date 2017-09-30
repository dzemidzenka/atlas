import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Router, NavigationEnd } from '@angular/router';

import { ACTION, COUNTRY, IStateModel, IActionModel, IUserModel, IMenuModel } from '../models/models';
// import { LOCAL_STORAGE_NAME_PROVIDER } from '../providers/tokens';
import * as tokens from '../providers/tokens';

import sortBy from 'lodash-es/sortBy';
import sortedUniq from 'lodash-es/sortedUniq';
import cloneDeep from 'lodash-es/cloneDeep';
import isEmpty from 'lodash-es/isEmpty';


@Injectable()
export class ReduxService {
  constructor(
    // @Inject(LOCAL_STORAGE_NAME_PROVIDER) private _localStorageName,
    private _router: Router,
  ) {
    // INITIALIZE REDUCER FUNCTIONS
    this._initReducers();

    // DERIVE MENU FROM THE ROUTES
    this._MENU = this._router.config
      .filter(route => route.hasOwnProperty('data'))
      .filter(route => route.data.hasOwnProperty('active'))
      .filter(route => route.data.active === true)
      .filter(route => route.hasOwnProperty('canActivate'))
      .filter(route => route.hasOwnProperty('resolve'))
      .map(menuItemFromRoute)
      .map((menu: IMenuModel, i) => { menu.id = i + 1; return menu; });

    // SUBSCRIBE TO REDUX STATE - nessesary to maintain at least one subscription active while the app is running
    this._state$Subscription = this.state$.subscribe(state => {
      console.log('Redux state', state);
      // localStorage.setItem(this._localStorageName, JSON.stringify(state));
    });
  }


  country: string;
  urlParams: Array<string>;
  private _MENU: Array<IMenuModel>;

  private _reducers: Array<Function> = [];
  private _actionSubject$ = new Subject<IActionModel>();
  private _state$Subscription: Subscription;

  private _initialState: IStateModel = (function () {
    let state: IStateModel;
    // if (this._localStorageName) {
    //   state = JSON.parse(localStorage.getItem(this._localStorageName));
    // }
    if (!state) {
      state = {
        action: undefined,
        urlParams: undefined,
        user: undefined,
        country: undefined,
        menu: undefined,
      };
    }
    return state;
  }).bind(this)();





  // ROUTING EVENTS HANDLER
  private _routerEvents$ = this._router.events
    .filter(event => event instanceof NavigationEnd)
    // .do(event => console.log(this._router))
    .map(event => Object.assign({ op: ACTION.ROUTE, urlParams: event['urlAfterRedirects'].split('/') }));





  // APPLICATION STATE STORE
  state$: Observable<IStateModel> = this._actionSubject$
    .merge(this._routerEvents$)
    .scan((state: IStateModel, action: IActionModel) => this._reducer(state, action), this._initialState)
    .publishBehavior({})
    .refCount() as Observable<IStateModel>;




  // REDUCER HANDLER
  private _reducer(state: IStateModel, action: IActionModel) {
    const _state = cloneDeep(state);
    const _action = cloneDeep(action);
    if (_action.op in ACTION) {
      this._reducers[_action.op].call(this, _state, _action);
      _state.action = _action;
    }
    return _state;
  }



  // REDUCERS
  private _initReducers() {
    this._reducers[ACTION.LOGIN] = (state: IStateModel, action: IActionModel) => {
      state.user = action.user;
    };

    this._reducers[ACTION.LOGOUT] = (state: IStateModel, action: IActionModel) => {
      // this._state$Subscription.unsubscribe();
    };

    this._reducers[ACTION.ROUTE] = (state: IStateModel, action: IActionModel) => {
      this.urlParams = state.urlParams = action.urlParams.filter(param => param.length > 0).map(param => param.toLowerCase());
      this.country = state.country = this.urlParams[0];
      if (!state.menu) {
        state.menu = cloneDeep(this._MENU);
      }
      getActiveMenu(state);
    };
  }


  // REDUX ACTIONS
  logIn(user: IUserModel) {
    this._actionSubject$.next(Object.assign({ op: ACTION.LOGIN, user: user }));
  }

  logOut() {
    this._actionSubject$.next(Object.assign({ op: ACTION.LOGOUT }));
  }
}




// ***********************************************************************
// UTILITY FUNCTIONS
// ***********************************************************************
function menuItemFromRoute(route, i, routes) {
  const params = route.path.split('/');
  return {
    urlParams: params,
    routerPath: route.path,
    ...route.data,
    id: 0,
  };
}



// determine which menus are active per current URL params
function getActiveMenu(state: IStateModel) {

  // get isFolder - isFolder = true if it's country item (urlParam = 1) or item has children items
  // state.menu.map((item, i, menu) => {
  //   item.isFolder = false;
  //   item.isFolder = menu.some(o =>
  //     o.routerPath.includes(item.routerPath) && o.urlParams.length > item.urlParams.length
  //   ) || item.urlParams.length === 1;
  //   return item;
  // });

  // get allowedCountries for each folder
  state.menu.map((item, i, menu) => {
    menu
      .filter(o => o.routerPath.includes(item.routerPath) && o.urlParams.length > item.urlParams.length && o.isComponent === true)
      .forEach(o => item.allowedCountries.push(...o.allowedCountries));
    const _allowedCountries = sortedUniq(item.allowedCountries.sort());
    item.allowedCountries = _allowedCountries;
    return item;
  });


  // get active
  state.menu.map(item => {
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
      if (item.allowedCountries.includes(state.country)) {
        item.urlParams[0] = state.country;

        let i = 0;
        for (const param of state.urlParams) {
          if (item.urlParams[i] !== state.urlParams[i]) {
            item.active = false;
            break;
          }
          i++;
        }
      } else {
        item.active = false;
      }
    }
  });
  console.log('ACTIVE_MENU', state.menu);
}
