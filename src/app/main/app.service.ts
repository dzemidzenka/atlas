import { Injectable } from '@angular/core';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/providers/notification.service';
import { LocalStorageService } from '@shared/providers/local-storage.service';
import { LoadingService } from '@shared/providers/loading.service';
import { ReLoginService } from '@shared/providers/re-login.service';
import { environment } from '@env';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { scan } from 'rxjs/operators/scan';
import { tap } from 'rxjs/operators/tap';
import { startWith } from 'rxjs/operators/startWith';
import { merge } from 'rxjs/operators/merge';
import { publishBehavior } from 'rxjs/operators/publishBehavior';
import { refCount } from 'rxjs/operators/refCount';
import { IRoutesAuth } from '@http/route.auth.interceptor.service';
import cloneDeep from 'lodash-es/cloneDeep';

export enum ACTION {
    INIT = 'INIT',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    NOT_AUTHORIZED = 'NOT_AUTHORIZED',
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

type IAction = IActionInit | IActionRoute | IActionLogIn | IActionLogOut | IActionFavoriteToggle | IActionNotAuthorized;

interface IActionRoute {
    type: ACTION;
    url: string;
    urlParams: string[];
    queryParams: IQueryParams;
}

interface IActionInit {
    type: ACTION;
    user: IUser;
}

interface IActionLogIn {
    type: ACTION;
    user: IUser;
    rememberMe: boolean;
}

interface IActionLogOut {
    type: ACTION;
}

interface IActionNotAuthorized {
    type: ACTION;
    url: string;
}

interface IActionFavoriteToggle {
    type: ACTION;
    menuItem: IMenu;
}

interface IQueryParams {
    country: COUNTRY;
    language: LANGUAGE;
    view: VIEW;
}

export interface IState {
    action: IAction;
    url: string;
    urlParams: string[];
    queryParams: IQueryParams;
    isComponent: boolean;
    isLoggedIn: boolean;
    user: IUser;
    app: string;
    apps: IMenu[];
    country: COUNTRY;
    countries: COUNTRY[];
    language: LANGUAGE;
    languages: LANGUAGE[],
    view: VIEW;
    views: VIEW[];
    menu: IMenu[];
    menuItemCurrent: IMenu;
    menuRecent: IMenu[];
    urlNotAuthorized: string;
}


export interface IUser {
    userName: string;
    routesAuth: IRoutesAuth[],
    phone: string;
    nameDisplay: string;
    countryDefault: COUNTRY;
    allowedCountries: string[];
    languageDefault: LANGUAGE;
    expires: number;
    accessToken: string;
}

export interface IMenu {
    id: number;
    active: boolean;
    description: string;
    excludeFromMenu: boolean;
    help: string;
    isComponent: boolean;
    isLazy: boolean;
    isFavorite: boolean;
    routerPath: string;
    urlParams: string[];
    tcode: string;
    iFrameUrl: string;
    children: IMenu[];
    notAuthorized: boolean;
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
        private _loadingService: LoadingService,
        private _reLoginService: ReLoginService,
    ) {
        this._translate.setDefaultLang(LANGUAGE.EN);
        this._initializeReducers();
        // console.log('ROUTES', this._router.config);
        // this._translate.get('HOME.HELLO', { value: 'world' }).subscribe((res: string) => {
        //   console.log(res);
        // });
    }

    private _currentState: IState;
    private _reducers = new Map<ACTION, (state: IState, action: any) => void>();
    private _actionSubject$ = new Subject<IAction>();
    private _routerEvents$ = this._router.events.pipe(
        // tap((event: {}) => console.log('EVENT', event)),
        filter((event: {}) => event instanceof NavigationEnd),
        map((event: {}) => {
            const url = (<NavigationEnd>event).urlAfterRedirects;
            const urlTree = this._router.parseUrl(url);
            const urlParams = url
                .split('/')
                .filter((param: string) => (param))
                .map((param: string) => param.split('?')[0]);
            const queryParams = urlTree.queryParams;
            // if (urlParams.length === 0) {
            //     urlParams.push('domestic');
            //     urlParams.push('home');
            //     this.actionMenu(urlParams);
            // }
            return { type: ACTION.ROUTE, url, urlParams, queryParams };
        }));


    // APPLICATION STATE STORE
    state$: Observable<IState> = this._actionSubject$.pipe(
        startWith({ type: ACTION.INIT, user: this._localStorageService.user } as IAction),
        merge(this._routerEvents$),
        scan((state: IState, action: Readonly<IAction>) => this._reducer(state, action), this._initializeState()),
        // map(this._getActiveMenu),
        this._getActiveMenu(),
        tap((state: IState) => this._currentState = state),
        publishBehavior(this._initializeState()),
        refCount());


    // REDUCER HANDLER
    private _reducer(state: IState, action: Readonly<IAction>): IState {
        const _state = cloneDeep(state);
        const _action = cloneDeep(action);
        this._reducers.get(_action.type)!(_state, _action);
        _state.action = _action;
        _state.isLoggedIn = _state.user.hasOwnProperty('accessToken');
        return _state;
    }


    private _initializeState(): IState {
        const _state = {
            action: {} as IAction,
            url: '',
            urlParams: [] as string[],
            queryParams: {} as IQueryParams,
            isComponent: false,
            isLoggedIn: false,
            user: {} as IUser,
            app: '',
            apps: [] as IMenu[],
            country: COUNTRY.US,
            countries: Object.values(COUNTRY).sort() as COUNTRY[],
            language: LANGUAGE.EN,
            languages: Object.values(LANGUAGE).sort() as LANGUAGE[],
            view: VIEW.DASHBOARD,
            views: Object.values(VIEW).sort() as VIEW[],
            // menu: this._router.config
            //     .filter((route: Route) => route.data && route.data.description)
            //     .map(this._menuItemFromRoute)
            //     .map(this._menuChildren),
            menu: [] as IMenu[],
            menuItemCurrent: {} as IMenu,
            menuRecent: [] as IMenu[],
            urlNotAuthorized: ''
        };
        // _state.apps = _state.menu.filter((menu: IMenu) => menu.urlParams.length === 1 && !menu.excludeFromMenu);
        // _state.menuItemCurrent = _state.menu[0];
        return Object.freeze(_state);
    }

    private _initializeReducers() {
        this._reducers.set(ACTION.INIT, (state: IState, action: Readonly<IActionInit>) => {
            state.user = action.user;
            this._handleRoutesAndMenu(state);
            // const url = window.location.pathname.substring(1);
            // if (url) {
            //     const menuItem = state.menu.find((menu: IMenu) => menu.routerPath.toLowerCase() === url.toLowerCase());
            //     if (menuItem) {
            //         state.isComponent = menuItem.isComponent; // to prevent screen blinking due to the delay of lazy loading network request
            //     }
            // }
        });

        this._reducers.set(ACTION.LOGIN, (state: IState, action: Readonly<IActionLogIn>) => {
            state.user = action.user;
            this._localStorageService.user = state.user;
            this._notificationsService.clear();
            this._handleRoutesAndMenu(state);
            this.actionMenu(state.menuItemCurrent.urlParams);
            this._loadingService.off();
            this._reLoginService.retry();
        });

        this._reducers.set(ACTION.LOGOUT, (state: IState, action: Readonly<IActionLogOut>) => {
            state.user = {} as IUser;
            this._localStorageService.user = state.user;
        });

        this._reducers.set(ACTION.NOT_AUTHORIZED, (state: IState, action: Readonly<IActionNotAuthorized>) => {
            state.urlNotAuthorized = action.url;
            this._router.navigateByUrl('not-authorized');
        });


        this._reducers.set(ACTION.ROUTE, (state: IState, action: Readonly<IActionRoute>) => {
            state.url = action.url;
            state.urlParams = action.urlParams.filter(param => param.length > 0).map(param => param.toLowerCase());
            state.queryParams = action.queryParams;
            if (state.urlParams[0] !== 'not-authorized') {
                state.app = state.urlParams[0];
            }
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
                state.menuItemCurrent = state.menu.find((item: IMenu) => item.routerPath === _routerPath) || {} as IMenu;
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

        this._reducers.set(ACTION.FAVORITE_TOGGLE, (state: IState, action: Readonly<IActionFavoriteToggle>) => {
            state.menu
                .filter(menu => action.menuItem && menu.id === action.menuItem.id)
                .map(menu => menu.isFavorite = !menu.isFavorite);
        });
    }




    // REDUX ACTIONS
    actionLogIn(username: string, password: string, rememberMe: boolean) {
        this._loadingService.on();
        const data = `grant_type=password&username=${username}&password=${password}&client_id=atlaswebapp`;
        // const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        const login$: Observable<any> = this._http.post<any>(environment.logInUrl, data);
        const routeAuth$: Observable<IRoutesAuth[]> = this._http.get<IRoutesAuth[]>('api/mock/routeAuth');

        Observable
            .forkJoin(login$, routeAuth$)
            .toPromise()
            .then((responses: [any, IRoutesAuth[]]) => {
                const authResponse = responses[0];
                authResponse.routesAuth = responses[1];
                return authResponse;
            })
            .then(this._userFromAuthResponse)
            .then((user: IUser) => this._actionSubject$.next({ type: ACTION.LOGIN, user, rememberMe }));

        // this._http
        //     .post(environment.logInUrl, data)
        //     .pipe(
        //     map(this._userFromAuthResponse),
        //     tap((user: IUser) => this._actionSubject$.next({ type: ACTION.LOGIN, user, rememberMe })))
        //     .toPromise();
    }

    actionLogOut() {
        if (this._currentState.isLoggedIn) {
            this._actionSubject$.next({ type: ACTION.LOGOUT });
        }
    }

    actionFavoriteToggle(menuItem: IMenu) {
        this._actionSubject$.next({ type: ACTION.FAVORITE_TOGGLE, menuItem });
    }

    actionLanguage(language: LANGUAGE) {
        this._translate.use(language);
        const urlParams = this._currentState.urlParams;
        const queryParams = this._currentState.queryParams;
        this._router.navigate([urlParams.join('/')], { queryParams: { ...queryParams, language } });
    }

    actionCountry(country: COUNTRY) {
        const urlParams = this._currentState.urlParams;
        const queryParams = this._currentState.queryParams;
        this._router.navigate([urlParams.join('/')], { queryParams: { ...queryParams, country } });
    }

    actionDashboard(view: VIEW) {
        this._router.navigate([''], { queryParams: { ...this._route.snapshot.queryParams, view } });
    }

    actionMenu(urlParams: string[], defaultToFirst: boolean = true) {
        if (defaultToFirst) {
            let item: IMenu | undefined;
            if (urlParams) {
                if (urlParams.length === 1) {
                    item = this._currentState.menu.find(menu => menu.urlParams[0] === urlParams[0] && menu.urlParams.length > urlParams.length);
                }
                else if (urlParams.length === 2) {
                    item = this._currentState.menu.find(menu => menu.urlParams[0] === urlParams[0] && menu.urlParams[1] === urlParams[1] && menu.urlParams.length > urlParams.length);
                }
            }
            if (item) {
                urlParams = item.urlParams;
            }
        }
        this._router.navigate([urlParams.join('/')], { queryParams: { ...this._route.snapshot.queryParams, view: null, from: null } });
    }

    actionTcode(tcode: string) {
        if (tcode.trim().length === 0) return;

        const urlParams: string[] = this._currentState.menu
            .filter(menu => menu.isComponent)
            .filter(menu => menu.hasOwnProperty('tcode'))
            .filter(menu => menu.tcode.trim().toLowerCase() === tcode.toLowerCase())[0].urlParams;
        this.actionMenu(urlParams);
    }

    actionNotAuthorized(url: string) {
        this._actionSubject$.next({ type: ACTION.NOT_AUTHORIZED, url });
    }

    // current state getter to prevent direct state access
    get currentState(): Readonly<IState> {
        return cloneDeep(this._currentState);
    }

    // determine which menus are active per current URL params
    // private _getActiveMenu(state: IState): IState {
    //     if (state.menu) {
    //         state.menu.map(item => {
    //             item.active = false;
    //             if (state.view === VIEW.FAVORITE) {
    //                 item.active = item.isFavorite;
    //                 return item;
    //             }
    //             if (state.view === VIEW.RECENT) {
    //                 item.active = state.menuRecent.some(menuItem => menuItem.id === item.id);
    //                 return item;
    //             }

    //             // e.g. if URL is /xxx, then menus for /xxx/yyy are allowed
    //             if (item.urlParams.length === state.urlParams.length + 1) {
    //                 item.active = true;
    //             } else {
    //                 item.active = false;
    //                 return item;
    //             }

    //             // match URL params and menu params
    //             state.urlParams.forEach((param, i) => item.active = (item.urlParams[i] === param));
    //             return item;
    //         });
    //     }
    //     return state;
    // }

    // determine which menus are active per current URL params
    private _getActiveMenu(): (source: Observable<IState>) => Observable<IState> {
        function getActiveMenu(state: IState): IState {
            if (state.menu) {
                state.menu.map(item => {
                    item.active = false;
                    if (state.view === VIEW.FAVORITE) {
                        item.active = item.isFavorite;
                        return item;
                    }
                    if (state.view === VIEW.RECENT) {
                        item.active = state.menuRecent.some(menuItem => menuItem.id === item.id);
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
                    state.urlParams.forEach((param, i) => item.active = (item.urlParams[i] === param));
                    return item;
                });
            }
            return state;
        };
        return (source: Observable<IState>) => source.pipe(map(getActiveMenu));
    }


    private _menuItemFromRoute(route: Route, index: number): IMenu {
        if (!route.path) return {} as IMenu;

        const params = route.path.split('/');

        let tcode = '';
        if (route.data && route.data.isComponent) {
            tcode = params[params.length - 1];
        }

        return {
            id: index + 1,
            urlParams: params,
            routerPath: route.path,
            isLazy: route.hasOwnProperty('loadChildren'),
            tcode: tcode,
            ...route.data,
        } as IMenu;
    }



    private _menuChildren(menuItem: IMenu, index: number, menu: IMenu[]): IMenu {
        menuItem.children = menu.filter(item => item.routerPath.startsWith(menuItem.routerPath) && item.urlParams.length === menuItem.urlParams.length + 1);
        return menuItem;
    }



    private _userFromAuthResponse(response: any): IUser {
        const allowedCountries = response['as:tenantContextHosts']
            .split(', ')
            .map((country: string) => country.trim().slice(0, 2).toLowerCase());
        if (!allowedCountries) {
            allowedCountries[0] = COUNTRY.US;
        }

        const user: IUser = {
            userName: response['userName'],
            routesAuth: response['routesAuth'],
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

    // private _applyRoutesAuthToRoutes(routesAuth: IRoutesAuth[]) {
    //     function applyRoutesAuthToRoutes(a: Route[], c: Route, i: number, routes: Route[]) {
    //         if (routesAuth.length > 0) {
    //             const _routes: Route[] = [];
    //             routes.forEach((route: Route) => {
    //                 const item = routesAuth.find((routeAuth: IRoutesAuth) => routeAuth.path === route.path);
    //                 if (item) {
    //                     if (item.allow !== 'hidden') {
    //                         _routes.push(route);
    //                     }
    //                 } else {
    //                     // _routes.push(route);
    //                 }
    //             });
    //             return _routes;
    //         } else {
    //             return routes;
    //         }
    //     };
    //     return applyRoutesAuthToRoutes;
    // }

    private _applyRoutesAuthToRoutes(routes: Route[], routesAuth: IRoutesAuth[]): Route[] {
        if (routesAuth && routesAuth.length > 0) {
            const _routes: Route[] = [];
            routes.forEach((route: Route) => {
                const item = routesAuth.find((routeAuth: IRoutesAuth) => routeAuth.path === route.path);
                if (item) {
                    if (item.allow === 'hidden') {
                        // route.path = 'page-not-found';
                        // route.data!.notAuthorized = true;
                        // _routes.push(route);
                    } else if (item.allow) {
                        _routes.push(route);
                    } else {
                        route.data!.notAuthorized = true;
                        _routes.push(route);
                    }
                } else {
                    // _routes.push(route);
                }
            });

            // append system routes
            _routes.push(...routes.filter((route: Route) => !route.data || !route.data.description));

            // change redirect for the default route
            const defaultRoute = _routes.find((route: Route) => !route.path);
            if (defaultRoute) {
                const defaultComponent = _routes.find((route: Route) => route.data && route.data.isComponent && !route.data.notAuthorized);
                if (defaultComponent) {
                    defaultRoute.redirectTo = defaultComponent.path;
                }
            }
            return _routes;
        } else {
            return routes;
        }
    }


    private _handleRoutesAndMenu(state: IState) {
        this._router.config = this._applyRoutesAuthToRoutes(this._router.config, state.user.routesAuth);
        state.menu = this._router.config
            .filter((route: Route) => route.data && route.data.description)
            .map(this._menuItemFromRoute)
            .map(this._menuChildren);
        state.apps = state.menu.filter((menu: IMenu) => menu.urlParams.length === 1 && !menu.excludeFromMenu);
        state.menuItemCurrent = state.menu.find((item: IMenu) => item.isComponent && !item.notAuthorized) || {} as IMenu;
    }
}
