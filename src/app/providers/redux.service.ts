import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Router, NavigationEnd } from '@angular/router';

import { ACTION, IStateModel, IActionModel, IUserModel } from '../models/models';
import { LOCAL_STORAGE_NAME_PROVIDER } from '../providers/tokens';

import sortBy from 'lodash-es/sortBy';
import sortedUniq from 'lodash-es/sortedUniq';
import cloneDeep from 'lodash-es/cloneDeep';
import isEmpty from 'lodash-es/isEmpty';


@Injectable()
export class ReduxService {
  constructor(
    @Inject(LOCAL_STORAGE_NAME_PROVIDER) private _localStorageName: string,
    private _router: Router,
  ) {
    this._initReducers();

    this._state$Subscription = this.state$.subscribe(state => {
      console.log('Redux state', state);
      // localStorage.setItem(this._localStorageName, JSON.stringify(state));
    });
  }


  country: string;
  component: string;
  folder: string;

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
        actions: [],
        component: '',
        folder: '',
        user: '',
        country: ''
      };
    }
    return state;
  }).bind(this)();


  private _routerEvents$ = this._router.events
    .filter(event => event instanceof NavigationEnd)
    .map(event => {
      const params = event['urlAfterRedirects'].split('/');
      return Object.assign({ op: ACTION.ROUTE, country: params[1], component: params[2], folder: params[3] });
    });


  state$: Observable<IStateModel> = this._actionSubject$
    // .startWith(Object.assign({ op: ACTION.RESET, raw: this._data }))
    .merge(this._routerEvents$)
    .scan((state: IStateModel, action: IActionModel) => this._reducer(state, action), this._initialState)
    .publishBehavior({})
    .refCount() as Observable<IStateModel>;





  private _reducer(state: IStateModel, action: IActionModel) {
    const _state = cloneDeep(state);
    if (action.op in ACTION) {
      this._reducers[action.op].call(this, _state, action);
      _state.actions.unshift(action);
    }
    return _state;
  }


  private _initReducers() {
    this._reducers[ACTION.LOGIN] = (state: IStateModel, action: IActionModel) => {
      state.user = action.user;
    };

    this._reducers[ACTION.LOGOUT] = (state: IStateModel, action: IActionModel) => {
      // this._state$Subscription.unsubscribe();
    };

    this._reducers[ACTION.ROUTE] = (state: IStateModel, action: IActionModel) => {
      this.country = state.country = action.country.toLowerCase();
      this.component = state.component = action.component.toLowerCase();
      this.folder = state.folder = action.folder ? action.folder.toLowerCase() : action.folder;
    };
  }


  // private _initState(state: IStateModel) {
  //   state.actions = [];
  //   state.component = '';
  //   state.folder = '';
  //   state.user = '';
  //   state.country = '';
  // }


  logIn(user: string) {
    this._actionSubject$.next(Object.assign({ op: ACTION.LOGIN, user: user }));
  }

  logOut() {
    this._actionSubject$.next(Object.assign({ op: ACTION.LOGOUT }));
  }
}
