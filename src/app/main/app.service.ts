import { Injectable } from '@angular/core';
import { Router, Route, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../shared/providers/notification.service';
import { LocalStorageService } from '../shared/providers/local-storage.service';
import { environment } from '../../environments/environment';
import cloneDeep from 'lodash-es/cloneDeep';

export enum ACTION {
    INIT = 'INIT',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    ROUTE = 'ROUTE',
    FAVORITE_TOGGLE = 'FAVORITE_TOGGLE'
}

// valid 2char country codes at https://www.iso.org/obp/ui/#search
export enum COUNTRY {
    US = 'us',
    DE = 'de',
    RU = 'ru',
    FR = 'fr',
    IT = 'it',
    GB = 'gb',
    JP = 'jp'
}

export enum LANGUAGE {
    EN = 'en',
    DE = 'de',
    RU = 'ru'
}

export enum VIEW {
    DASHBOARD = 'dashboard',
    FAVORITE = 'favorites',
    RECENT = 'recent'
}

type IActionModel = IActionInitModel | IActionRouteModel | IActionLogInModel | IActionLogOutModel | IActionFavoriteToggleModel;

interface IActionType {
    type: ACTION;
}

interface IActionRouteModel extends IActionType {
    url: string;
    urlParams: Array<string>;
    queryParams: IQueryParamsModel;
}

interface IActionInitModel extends IActionType {
    user: IUserModel;
}

interface IActionLogInModel extends IActionType {
    user: IUserModel;
    rememberMe: boolean;
}

interface IActionLogOutModel extends IActionType { }

interface IActionFavoriteToggleModel extends IActionType {
    menuItem: IMenuModel;
}

interface IQueryParamsModel {
    country: COUNTRY;
    language: LANGUAGE;
    view: VIEW;
}

export interface IStateModel {
    action: IActionModel;
    url: string;
    urlParams: Array<string>;
    queryParams: IQueryParamsModel;
    isComponent: boolean;
    isLoggedIn: boolean;
    user: IUserModel;
    country: COUNTRY;
    language: LANGUAGE;
    view: VIEW;
    menu: Array<IMenuModel>;
    menuItemCurrent: IMenuModel;
    menuRecent: Array<IMenuModel>;
}


export interface IUserModel {
    userName: string;
    phone: string;
    nameDisplay: string;
    countryDefault: COUNTRY;
    allowedCountries: Array<string>;
    languageDefault: LANGUAGE;
    expires: number;
    accessToken: string;
}

export interface IMenuModel {
    id: number;
    active: boolean;
    description: string;
    help: string;
    isComponent: boolean;
    isLazy: boolean;
    isFavorite: boolean;
    routerPath: string;
    urlParams: Array<string>;
    tcode: string;
    iFrameUrl: string;
}



@Injectable()
export class AppService {
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _http: HttpClient,
        private _translate: TranslateService,
        private _notificationsService: NotificationService,
        private _localStorageService: LocalStorageService,
    ) {
        this._translate.setDefaultLang(LANGUAGE.EN);
        this._initializeReducers();
        // console.log('ROUTES', this._router.config);
        // generateAdditionalRoutes(this._router.config);
        // this._translate.get('HOME.HELLO', { value: 'world' }).subscribe((res: string) => {
        //   console.log(res);
        // });
    }

    private _currentState: IStateModel;
    private _reducers = new Map();
    private _actionSubject$ = new Subject<IActionModel>();



    // ROUTING EVENTS HANDLER
    private _routerEvents$ = this._router.events
        .filter((event: {}) => event instanceof NavigationEnd)
        .map((event: {}) => {
            const url = (<NavigationEnd>event).urlAfterRedirects;
            const urlTree = this._router.parseUrl(url);
            const urlParams = url
                .split('/')
                .filter((param: string) => param !== '')
                .map((param: string) => param.split('?')[0]);
            const queryParams = urlTree.queryParams;
            return { type: ACTION.ROUTE, url: url, urlParams: urlParams, queryParams: queryParams };
        });

    // APPLICATION STATE STORE
    state$: Observable<IStateModel> = this._actionSubject$
        .startWith({ type: ACTION.INIT, user: this._localStorageService.user })
        .merge(this._routerEvents$)
        .scan((state: IStateModel, action: IActionModel) => this._reducer(state, action), this._initializeState())
        .map(this._getActiveMenu)
        .do((state: IStateModel) => this._currentState = state)
        .publishBehavior({})
        .refCount() as Observable<IStateModel>;



    // REDUCER HANDLER
    private _reducer(state: IStateModel, action: IActionModel): IStateModel {
        const _state = cloneDeep(state);
        if (action.type in ACTION) {
            const _action = cloneDeep(action);
            this._reducers.get(_action.type).call(this, _state, _action);
            _state.action = _action;
        }
        _state.isLoggedIn = _state.user.hasOwnProperty('accessToken');
        return _state;
    }


    private _initializeState(): IStateModel {
        return Object.freeze({
            action: {} as IActionModel,
            url: '',
            urlParams: [],
            queryParams: {} as IQueryParamsModel,
            isComponent: false,
            isLoggedIn: false,
            user: {} as IUserModel,
            country: COUNTRY.US,
            language: LANGUAGE.EN,
            view: VIEW.DASHBOARD,
            menu: this._router.config
                .filter((route: Route) => route.data && route.data.description)
                .map(this._menuItemFromRoute),
            menuItemCurrent: {} as IMenuModel,
            menuRecent: [],
        });
    }

    private _initializeReducers() {
        this._reducers.set(ACTION.INIT, (state: IStateModel, action: IActionInitModel) => {
            state.user = action.user;
            const url = window.location.pathname.substring(1);
            if (url) {
                const menuItem = state.menu.find(menu => menu.routerPath.toLowerCase() === url.toLowerCase());
                if (menuItem) {
                    state.isComponent = menuItem.isComponent; // to prevent screen blinking due to the delay of lazy loading network request
                }
            }
        });

        this._reducers.set(ACTION.LOGIN, (state: IStateModel, action: IActionLogInModel) => {
            state.user = action.user;
            // state.isLoggedIn = true;
            this._localStorageService.user = state.user;
            this._notificationsService.clear();
        });

        this._reducers.set(ACTION.LOGOUT, (state: IStateModel, action: IActionLogOutModel) => {
            state.user = {} as IUserModel;
            this._localStorageService.user = state.user;
            // state.isLoggedIn = false;
        });

        this._reducers.set(ACTION.ROUTE, (state: IStateModel, action: IActionRouteModel) => {
            state.url = action.url;
            state.urlParams = action.urlParams.filter(param => param.length > 0).map(param => param.toLowerCase());
            state.queryParams = action.queryParams;
            state.language = state.queryParams.language || LANGUAGE.EN;
            this._translate.use(state.language);
            state.country = state.queryParams.country || COUNTRY.US;
            state.view = state.queryParams.view || VIEW.DASHBOARD;
            if (!state.menuRecent) {
                state.menuRecent = [];
            }

            const _urlParams = [...state.urlParams];
            const _routerPath = _urlParams.join('/');
            if (state.menu) {
                state.menuItemCurrent = state.menu.find(item => item.routerPath === _routerPath) || {} as IMenuModel;
            }
            state.isComponent = false;
            if (state.menuItemCurrent) {
                state.isComponent = state.menuItemCurrent.isComponent;
            }

            if (state.isComponent) {
                // add component to recent
                if (!state.menuRecent.some(recent => recent.id === state.menuItemCurrent.id)) {
                    state.menuRecent.unshift(state.menuItemCurrent);
                    state.menuRecent = state.menuRecent.slice(0, environment.MAX_OF_RECENT - 1);
                }
            }
        });

        this._reducers.set(ACTION.FAVORITE_TOGGLE, (state: IStateModel, action: IActionFavoriteToggleModel) => {
            state.menu
                .filter(menu => action.menuItem && menu.id === action.menuItem.id)
                .map(menu => menu.isFavorite = !menu.isFavorite);
        });
    }




    // REDUX ACTIONS
    actionLogIn(username: string, password: string, rememberMe: boolean): Observable<IUserModel> {
        const data = `grant_type=password&username=${username}&password=${password}&client_id=atlaswebapp`;
        // const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http
            .post(environment.logInUrl, data)
            .map(this._userFromAuthResponse)
            .do(user => this._actionSubject$.next({ type: ACTION.LOGIN, user: user, rememberMe: rememberMe }));
    }

    actionLogOut() {
        if (this._currentState.isLoggedIn) {
            this._actionSubject$.next({ type: ACTION.LOGOUT });
        }
    }

    actionFavoriteToggle(menuItem: IMenuModel) {
        this._actionSubject$.next({ type: ACTION.FAVORITE_TOGGLE, menuItem: menuItem });
    }

    actionLanguage(language: LANGUAGE) {
        this._translate.use(language);
        const urlParams = this._currentState.urlParams;
        const queryParams = this._currentState.queryParams;
        this._router.navigate([urlParams.join('/')], { queryParams: { ...queryParams, language: language } });
    }

    actionCountry(country: COUNTRY) {
        const urlParams = this._currentState.urlParams;
        const queryParams = this._currentState.queryParams;
        this._router.navigate([urlParams.join('/')], { queryParams: { ...queryParams, country: country } });
    }

    actionDashboard(view: VIEW) {
        this._router.navigate([''], { queryParams: { ...this._route.snapshot.queryParams, view: view } });
    }

    actionMenu(urlParams: Array<string>) {
        this._router.navigate([urlParams.join('/')], { queryParams: { ...this._route.snapshot.queryParams, view: null } });
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
    get currentState(): IStateModel {
        return cloneDeep(this._currentState);
    }

    // determine which menus are active per current URL params
    private _getActiveMenu(state: IStateModel): IStateModel {
        if (state.menu) {
            state.menu.map(item => {
                item.active = false;
                if (state.view === VIEW.FAVORITE) {
                    item.active = item.isFavorite;
                    return item;
                }
                if (state.view === VIEW.RECENT) {
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
        return state;
    }



    private _menuItemFromRoute(route: Route, index: number): IMenuModel {
        if (!route.path) {
            return {} as IMenuModel;
        }

        const params = route.path.split('/');

        let tcode;
        if (route.data && route.data.isComponent) {
            tcode = params[params.length - 1];
        }

        return {
            id: index + 1,
            urlParams: params,
            routerPath: route.path,
            isLazy: route.hasOwnProperty('loadChildren'),
            tcode: tcode,
            ...route.data
        } as IMenuModel;
    }



    private _userFromAuthResponse(response: any): IUserModel {
        const allowedCountries = response['as:tenantContextHosts']
            .split(', ')
            .map((country: string) => country.trim().slice(0, 2).toLowerCase());
        if (!allowedCountries) {
            allowedCountries[0] = COUNTRY.US;
        }

        const user: IUserModel = {
            userName: response['userName'],
            phone: response['as:claim:http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'],
            nameDisplay: response['as:claim:http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
            countryDefault: response['as:claim:http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country'],
            allowedCountries: [...allowedCountries],
            languageDefault: LANGUAGE.EN,
            expires: Math.floor(Date.now() / 1000) + response['expires_in'],
            accessToken: response['access_token']
        };
        user.countryDefault = user.countryDefault ? user.countryDefault.toLowerCase() as COUNTRY : COUNTRY.US;
        return user;
    }
}

// ***********************************************************************
// UTILITY FUNCTIONS
// ***********************************************************************
// function generateAdditionalRoutes(routes) {
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
// }
