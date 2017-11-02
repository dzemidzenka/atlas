import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

import * as models from '../shared/models';
import * as constants from '../shared/constants';
import * as tokens from '../shared/constants';

// import sortBy from 'lodash-es/sortBy';
// import sortedUniq from 'lodash-es/sortedUniq';
import cloneDeep from 'lodash-es/cloneDeep';
import omit from 'lodash-es/omit';

import REDUCER_INIT from './reducer.INIT';
import REDUCER_LOGIN from './reducer.LOGIN';
import REDUCER_LOGOUT from './reducer.LOGOUT';
import REDUCER_ROUTE from './reducer.ROUTE';
import REDUCER_NOTIFICATION from './reducer.NOTIFICATION';
import REDUCER_NOTIFICATION_CLEAR from './reducer.NOTIFICATION_CLEAR';
import REDUCER_FAVORITE_TOGGLE from './reducer.FAVORITE_TOGGLE';

@Injectable()
export class ReduxService {
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _http: HttpClient,
        private _notificationsService: NotificationsService,
        private _translate: TranslateService,
        @Inject(tokens.lsAUTH) private _lsAuth: string
    ) {
        // initialize reducers
        REDUCER_INIT.bind(this)();
        REDUCER_LOGIN.bind(this)();
        REDUCER_LOGOUT.bind(this)();
        REDUCER_ROUTE.bind(this)();
        REDUCER_NOTIFICATION.bind(this)();
        REDUCER_NOTIFICATION_CLEAR.bind(this)();
        REDUCER_FAVORITE_TOGGLE.bind(this)();

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
        state.urlParams = [];
        state.queryParams = [];
        state.menu = this._router.config
            .filter(route => route.hasOwnProperty('data'))
            .filter(route => route.data.hasOwnProperty('description'))
            .map(this._menuItemFromRoute)
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
            return { type: models.ACTION.ROUTE, url: url, urlParams: urlParams, queryParams: queryParams };
        });

    // APPLICATION STATE STORE
    state$: Observable<models.IStateModel> = this._actionSubject$
        .startWith({ type: models.ACTION.INIT, user: JSON.parse(localStorage.getItem(this._lsAuth)) })
        .merge(this._routerEvents$)
        .scan((state: models.IStateModel, action: models.IActionModel) => this._reducer(state, action), this._initialState)
        .do(state => (this._currentState = state))
        .publishBehavior({})
        .refCount() as Observable<models.IStateModel>;

    // REDUCER HANDLER
    private _reducer(state: models.IStateModel, action: models.IActionModel) {
        const _state = cloneDeep(state);
        if (action.type in models.ACTION) {
            const _action = cloneDeep(action);
            this._reducers[_action.type].call(this, _state, _action);
            _state.action = _action;
            _state.action.date = Math.floor(Date.now() / 1000);
            // check if session has expired
            if (_state.isLoggedIn) {
                _state.isLoggedIn = _state.action.date < _state.user.expires;
            }
        }
        return _state;
    }

    // REDUX ACTIONS
    actionLogIn(username: string, password: string, rememberMe: boolean): Observable<models.IUserModel> {
        const data = `grant_type=password&username=${username}&password=${password}&client_id=atlaswebapp`;
        const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        return (
            this._http
                .post('http://atlasglobal-dev.nuvasive.com/api/token', data)
                // .switchMap(response => {
                //   console.log('response["ok"]', response['ok']);
                //   return Observable.throw(new Error(JSON.parse(response['error'])['error_description']));
                //   // return response['ok'] ?
                //   //   Observable.of(response) : Observable.throw(new Error(JSON.parse(response['error'])['error_description']));
                // })
                .map(this._userFromAuthResponse)
                .do(user => this._actionSubject$.next({ type: models.ACTION.LOGIN, user: user, rememberMe: rememberMe }))
                .catch((errorResponse: HttpErrorResponse) => {
                    console.log('HTTP AUTH ERROR', errorResponse);
                    if (errorResponse.ok) {
                        return Observable.throw(JSON.parse(errorResponse['error'])['error_description']);
                    } else {
                        return Observable.throw(errorResponse.message);
                    }
                })
        );
    }

    actionLogOut(message?: string) {
        if (this._currentState.isLoggedIn) {
            this._actionSubject$.next({
                type: models.ACTION.LOGOUT,
                notifications: message ? [{ message: message }] : []
            });
        }
    }

    actionFavoriteToggle(menuItem: models.IMenuModel) {
        this._actionSubject$.next({ type: models.ACTION.FAVORITE_TOGGLE, menuItem: menuItem });
    }

    actionNotify(notifications: Array<models.INotificationModel>) {
        this._actionSubject$.next({ type: models.ACTION.NOTIFICATION, notifications: notifications });
    }

    actionClearNotifications() {
        this._actionSubject$.next({ type: models.ACTION.NOTIFICATION_CLEAR });
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

    actionTcode(tcode: string) {
        if (tcode.trim().length === 0) {
            return;
        }
        const urlParams: Array<string> = this._currentState.menu
            .filter(menu => menu.isComponent)
            .filter(menu => menu.hasOwnProperty('tcode'))
            .filter(menu => menu.tcode.trim().toLowerCase() === tcode.toLowerCase())[0].urlParams;
        this.actionMenu(urlParams);
    }

    // current state getter to prevent direct state access
    getCurrentState(): models.IStateModel {
        return cloneDeep(this._currentState);
    }

    // determine which menus are active per current URL params
    private _getActiveMenu(state: models.IStateModel) {
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

    private _menuItemFromRoute(route, i, routes) {
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

    private _userFromAuthResponse(response: Response): models.IUserModel {
        const allowedCountries = response['as:tenantContextHosts'].split(', ').map(country =>
            country
                .trim()
                .slice(0, 2)
                .toLowerCase()
        );

        const user: models.IUserModel = {
            userName: response['userName'],
            phone: response['as:claim:http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'],
            nameDisplay: response['as:claim:http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
            countryDefault: response['as:claim:http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country'].toLowerCase(),
            allowedCountries: [...allowedCountries],
            languageDefault: models.LANGUAGE.EN,
            expires: Math.floor(Date.now() / 1000) + response['expires_in'],
            access_token: response['access_token']
        };
        return user;
    }
}

// ***********************************************************************
// UTILITY FUNCTIONS
// ***********************************************************************
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
