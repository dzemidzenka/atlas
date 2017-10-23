import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

import * as models from '../shared/models';
import * as constants from '../shared/constants';
import * as tokens from '../shared/constants';

import sortBy from 'lodash-es/sortBy';
import sortedUniq from 'lodash-es/sortedUniq';
import cloneDeep from 'lodash-es/cloneDeep';
import isEmpty from 'lodash-es/isEmpty';
import omit from 'lodash-es/omit';

@Injectable()
export class ReduxService {
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _notificationsService: NotificationsService,
        private _translate: TranslateService,
        @Inject(tokens.lsAUTH) private _lsAuth: string
    ) {
        this._initReducers();
        // console.log('ROUTES', this._router.config);
        // generateAdditionalRoutes(this._router.config);
        this._translate.setDefaultLang(models.LANGUAGE.EN);
        // this._translate.get('HOME.HELLO', { value: 'world' }).subscribe((res: string) => {
        //   console.log(res);
        // });
    }

    private _currentState: models.IStateModel;
    private _reducers: Array<Function> = [];
    private _actionSubject$ = new Subject<models.IActionModel>();
    private _initialState: models.IStateModel = (() => {
        const state: models.IStateModel = {} as models.IStateModel;
        state.notifications = [];
        state.menu = this._router.config
            .filter(route => route.hasOwnProperty('data'))
            .filter(route => route.data.hasOwnProperty('description'))
            .map(menuItemFromRoute)
            .map((menu: models.IMenuModel, i) => {
                menu.id = i + 1;
                return menu;
            });
        return state;
    })();

    // ROUTING EVENTS HANDLER
    private _routerEvents$ = this._router.events
        .filter(event => event instanceof NavigationEnd)
        // .do(event => console.log(this._router))
        .map(event => {
            const url = event['urlAfterRedirects'];
            const urlTree = this._router.parseUrl(url);
            const urlParams = url
                .split('/')
                .filter(param => param !== '')
                .map(param => param.split('?')[0]);
            const queryParams = urlTree.queryParams;
            return Object.assign({ op: models.ACTION.ROUTE, url: url, urlParams: urlParams, queryParams: queryParams });
        });

    // APPLICATION STATE STORE
    state$: Observable<models.IStateModel> = this._actionSubject$
        .startWith(Object.assign({ op: models.ACTION.INIT, user: JSON.parse(localStorage.getItem(this._lsAuth)) }))
        .merge(this._routerEvents$)
        .scan((state: models.IStateModel, action: models.IActionModel) => this._reducer(state, action), this._initialState)
        .do(state => (this._currentState = state))
        .publishBehavior({})
        .refCount() as Observable<models.IStateModel>;

    // REDUCER HANDLER
    private _reducer(state: models.IStateModel, action: models.IActionModel) {
        const _state = cloneDeep(state);
        if (action.op in models.ACTION) {
            const _action = cloneDeep(action);
            this._reducers[_action.op].call(this, _state, _action);
            _state.action = _action;
            _state.action.date = Math.floor(Date.now() / 1000);
            // check if session has expired
            if (_state.isLoggedIn) {
                _state.isLoggedIn = _state.action.date < _state.user.expires;
            }
        }
        return _state;
    }

    // REDUCERS
    private _initReducers() {
        this._reducers[models.ACTION.INIT] = (state: models.IStateModel, action: models.IActionModel) => {
            if (!isEmpty(action.user)) {
                state.user = action.user;
                state.isLoggedIn = true;
                const url = window.location.pathname + window.location.search;
                const urlTree = this._router.parseUrl(url);
                const urlParams = url
                    .split('/')
                    .filter(param => param !== '')
                    .map(param => param.split('?')[0]);
                const queryParams = omit(urlTree.queryParams, 'returnUrl');
                const returnUrl = urlTree.queryParams['returnUrl'];

                state.language = (queryParams['language'] ? queryParams['language'] : state.user.languageDefault) as models.LANGUAGE;
                state.country = (queryParams['country'] ? queryParams['country'] : state.user.countryDefault) as models.COUNTRY;
                state.view = queryParams['view'] as models.VIEW;

                let returnUrlParams;
                if (returnUrl) {
                    returnUrlParams = returnUrl
                        .split('/')
                        .filter(param => param !== '')
                        .map(param => param.split('?')[0]);
                }
                this._router.navigate(returnUrl ? [returnUrlParams.join('/')] : [urlParams.join('/')], { queryParams: { ...queryParams } });
            }
        };

        this._reducers[models.ACTION.LOGIN] = (state: models.IStateModel, action: models.IActionModel) => {
            state.user = action.user;
            state.isLoggedIn = true;

            localStorage.setItem(this._lsAuth, JSON.stringify(state.user));
            this._notificationsService.remove();

            const queryParams = omit(this._route.snapshot.queryParams, 'returnUrl');
            const returnUrl = this._route.snapshot.queryParams['returnUrl'];

            state.language = queryParams['language'] ? queryParams['language'] : state.user.languageDefault;
            state.country = queryParams['country'] ? queryParams['country'] : state.user.countryDefault;
            state.view = queryParams['view'];

            let returnUrlParams;
            if (returnUrl) {
                const menuItem = state.menu.find(menu => menu.routerPath === returnUrl);
                if (menuItem) {
                    state.isComponent = menuItem.isComponent; // to prevent screen blinking due to the delay of lazy loading network request
                }
                returnUrlParams = returnUrl
                    .split('/')
                    .filter(param => param !== '')
                    .map(param => param.split('?')[0]);
            }
            this._router.navigate(returnUrl ? [returnUrlParams.join('/')] : [state.url.split('?')[0]], { queryParams: { ...queryParams } });
        };

        this._reducers[models.ACTION.LOGOUT] = (state: models.IStateModel, action: models.IActionModel) => {
            localStorage.removeItem(this._lsAuth);
            if (action.notifications.length > 0) {
                action.notifications.forEach(notification => this._notificationsService.info(notification.message, null, { timeOut: 0 }));
            } else {
                if (isEmpty(state.user)) {
                    this._notificationsService.info('Logged out. Goodbye!');
                } else {
                    this._notificationsService.info(`${state.user.nameDisplay} logged out. Goodbye!`);
                }
            }

            state.user = {} as models.IUserModel;
            state.isLoggedIn = false;

            const queryParams = {
                country: state.country,
                language: state.language,
                view: state.view
            };
            if (state.urlParams.length > 0) {
                queryParams['returnUrl'] = state.urlParams.join('/');
            }
            this._router.navigate([''], { queryParams: { ...queryParams } });
        };

        this._reducers[models.ACTION.NOTIFICATION] = (state: models.IStateModel, action: models.IActionModel) => {
            action.notifications
                .map((notification: models.INotificationModel) => {
                    notification.date = Date.now();
                    return notification;
                })
                .forEach(notification => {
                    state.notifications.push(notification);
                    this._notificationsService.info(notification.message);
                });
        };

        this._reducers[models.ACTION.NOTIFICATION_CLEAR] = (state: models.IStateModel, action: models.IActionModel) => {
            state.notifications = [];
        };

        this._reducers[models.ACTION.FAVORITE_TOGGLE] = (state: models.IStateModel, action: models.IActionModel) => {
            state.menu.filter(menu => menu.id === action.menuItem.id).map(menu => (menu.isFavorite = !menu.isFavorite));
            getActiveMenu(state);
        };

        this._reducers[models.ACTION.ROUTE] = (state: models.IStateModel, action: models.IActionModel) => {
            state.url = action.url;
            state.urlParams = action.urlParams.filter(param => param.length > 0).map(param => param.toLowerCase());
            state.queryParams = action.queryParams;

            if (state.queryParams['language']) {
                state.language = state.queryParams['language'];
            } else {
                state.language = models.LANGUAGE.EN;
            }
            this._translate.use(state.language);

            if (state.queryParams['country']) {
                state.country = state.queryParams['country'];
            } else {
                state.country = models.COUNTRY.US;
            }

            if (state.queryParams['view']) {
                state.view = state.queryParams['view'];
            }
            if (!state.menuRecent) {
                state.menuRecent = [];
            }

            const _urlParams = [...state.urlParams];
            const _routerPath = _urlParams.join('/');
            if (state.menu) {
                state.menuItemCurrent = state.menu.find(item => item.routerPath === _routerPath);
            }
            state.isComponent = false;
            if (state.menuItemCurrent) {
                state.isComponent = state.menuItemCurrent.isComponent;
            }

            // add component to recent
            if (state.isComponent) {
                if (!state.menuRecent.some(recent => recent.id === state.menuItemCurrent.id)) {
                    state.menuRecent.unshift(state.menuItemCurrent);
                    state.menuRecent = state.menuRecent.slice(0, constants.MAX_OF_RECENT - 1);
                }
            }
            getActiveMenu(state);
        };
    }

    // REDUX ACTIONS
    actionLogIn(user: models.IUserModel) {
        this._actionSubject$.next(Object.assign({ op: models.ACTION.LOGIN, user: user }));
    }

    actionLogOut(message?: string) {
        if (this._currentState.isLoggedIn) {
            this._actionSubject$.next(
                Object.assign({
                    op: models.ACTION.LOGOUT,
                    notifications: message ? [{ message: message }] : []
                })
            );
        }
    }

    actionFavoriteToggle(menuItem: models.IMenuModel) {
        this._actionSubject$.next(Object.assign({ op: models.ACTION.FAVORITE_TOGGLE, menuItem: menuItem }));
    }

    actionNotify(notifications: Array<models.INotificationModel>) {
        this._actionSubject$.next(Object.assign({ op: models.ACTION.NOTIFICATION, notifications: notifications }));
    }

    actionClearNotifications() {
        this._actionSubject$.next(Object.assign({ op: models.ACTION.NOTIFICATION_CLEAR }));
    }

    actionLanguage(language: models.LANGUAGE) {
        this._translate.use(language);
        const urlParams = this._currentState.urlParams;
        const queryParams = this._currentState.queryParams;
        this._router.navigate([urlParams.join('/')], { queryParams: { ...queryParams, language: language } });
    }

    actionCountry(country: models.COUNTRY) {
        const urlParams = this._currentState.urlParams;
        const queryParams = this._currentState.queryParams;
        this._router.navigate([urlParams.join('/')], { queryParams: { ...queryParams, country: country } });
    }

    actionDashboard(view: models.VIEW) {
        const queryParams = this._route.snapshot.queryParams;
        this._router.navigate([''], { queryParams: { ...queryParams, view: view } });
    }

    actionMenu(urlParams: Array<string>) {
        const queryParams = omit(this._route.snapshot.queryParams, 'view');
        this._router.navigate([urlParams.join('/')], { queryParams: { ...queryParams, view: models.VIEW.DASHBOARD } });
    }

    // current state getter to prevent direct state access
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
        ...route.data
    };
}

// determine which menus are active per current URL params
function getActiveMenu(state: models.IStateModel) {
    if (state.menu) {
        state.menu.map(item => {
            item.active = false;
            if (state.view === models.VIEW.FAVORITE) {
                item.active = item.isFavorite;
                return item;
            }
            if (state.view === models.VIEW.RECENT) {
                if (state.hasOwnProperty('menuRecent')) {
                    item.active = state.menuRecent.some(menuItem => menuItem.id === item.id);
                }
                return item;
            }

            // e.g. if URL is /xxx, then menus for /xxx/yyy are allowed
            if (item.urlParams.length === state.urlParams.length + 1) {
                item.active = true;
            } else {
                item.active = false;
                return item;
            }

            // match URL params and menu params
            let i = 0;
            for (const param of state.urlParams) {
                if (item.urlParams[i] !== state.urlParams[i]) {
                    item.active = false;
                    break;
                }
                i++;
            }
            return item;
        });
    }
}

function generateAdditionalRoutes(routes) {
    // const _routes = routes;
    // create a route for each country
    // Object.keys(models.COUNTRY)
    //   .map(country => country.toLowerCase())
    //   .forEach(country => _routes.push(
    //     {
    //       path: country.toLowerCase(),
    //       component: 'DashboardComponent',
    //       canActivate: [],
    //       resolve: {},
    //       data: { description: country.toUpperCase() },
    //     }));
    // _routes.push(
    //   {
    //     path: '**',
    //     redirectTo: 'us/page-not-found',
    //   }
    // );
}
