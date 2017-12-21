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

interface IActionRouteModel {
    type: ACTION;
    url: string;
    urlParams: Array<string>;
    queryParams: IQueryParamsModel;
}

interface IActionInitModel {
    type: ACTION;
    user: IUserModel;
}

interface IActionLogInModel {
    type: ACTION;
    user: IUserModel;
    rememberMe: boolean;
}

interface IActionLogOutModel {
    type: ACTION;
}

interface IActionFavoriteToggleModel {
    type: ACTION;
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
    app: string;
    apps: Array<IMenuModel>;
    country: COUNTRY;
    countries: Array<COUNTRY>;
    language: LANGUAGE;
    languages: Array<LANGUAGE>,
    view: VIEW;
    views: Array<VIEW>;
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
    excludeFromMenu: boolean;
    help: string;
    isComponent: boolean;
    isLazy: boolean;
    isFavorite: boolean;
    routerPath: string;
    urlParams: Array<string>;
    tcode: string;
    iFrameUrl: string;
    children: Array<IMenuModel>;
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

    private _currentState: IStateModel;
    private _reducers = new Map<ACTION, (state: IStateModel, action: any) => void>();
    private _actionSubject$ = new Subject<IActionModel>();
    private _routerEvents$ = this._router.events.pipe(
        filter((event: {}) => event instanceof NavigationEnd),
        map((event: {}) => {
            const url = (<NavigationEnd>event).urlAfterRedirects;
            const urlTree = this._router.parseUrl(url);
            const urlParams = url
                .split('/')
                .filter((param: string) => (param))
                // .filter((param: string) => param !== '')
                .map((param: string) => param.split('?')[0]);
            const queryParams = urlTree.queryParams;
            if (urlParams.length === 0) {
                urlParams.push('domestic');
                urlParams.push('home');
                this.actionMenu(urlParams);
            }
            return { type: ACTION.ROUTE, url, urlParams, queryParams };
        }));


    // APPLICATION STATE STORE
    state$: Observable<IStateModel> = this._actionSubject$.pipe(
        startWith({ type: ACTION.INIT, user: this._localStorageService.user } as IActionModel),
        merge(this._routerEvents$),
        scan((state: IStateModel, action: Readonly<IActionModel>) => this._reducer(state, action), this._initializeState()),
        map(this._getActiveMenu),
        tap((state: IStateModel) => this._currentState = state),
        publishBehavior(this._initializeState()),
        refCount());


    // REDUCER HANDLER
    private _reducer(state: IStateModel, action: Readonly<IActionModel>): IStateModel {
        const _state = cloneDeep(state);
        const _action = cloneDeep(action);
        this._reducers.get(_action.type)!(_state, _action);
        _state.action = _action;
        _state.isLoggedIn = _state.user.hasOwnProperty('accessToken');
        return _state;
    }


    private _initializeState(): IStateModel {
        const _state = {
            action: {} as IActionModel,
            url: '',
            urlParams: [] as Array<string>,
            queryParams: {} as IQueryParamsModel,
            isComponent: false,
            isLoggedIn: false,
            user: {} as IUserModel,
            app: '',
            apps: [] as Array<IMenuModel>,
            country: COUNTRY.US,
            countries: Object.values(COUNTRY).sort() as Array<COUNTRY>,
            language: LANGUAGE.EN,
            languages: Object.values(LANGUAGE).sort() as Array<LANGUAGE>,
            view: VIEW.DASHBOARD,
            views: Object.values(VIEW).sort() as Array<VIEW>,
            menu: this._router.config
                .filter((route: Route) => route.data && route.data.description)
                .map(this._menuItemFromRoute)
                .map(this._menuChildren),
            menuItemCurrent: {} as IMenuModel,
            menuRecent: [] as Array<IMenuModel>,
        };
        _state.apps = _state.menu.filter((menu: IMenuModel) => menu.urlParams.length === 1 && !menu.excludeFromMenu);
        return Object.freeze(_state);
    }

    private _initializeReducers() {
        this._reducers.set(ACTION.INIT, (state: IStateModel, action: Readonly<IActionInitModel>) => {
            state.user = action.user;
            const url = window.location.pathname.substring(1);
            if (url) {
                const menuItem = state.menu.find(menu => menu.routerPath.toLowerCase() === url.toLowerCase());
                if (menuItem) {
                    state.isComponent = menuItem.isComponent; // to prevent screen blinking due to the delay of lazy loading network request
                }
            }
        });

        this._reducers.set(ACTION.LOGIN, (state: IStateModel, action: Readonly<IActionLogInModel>) => {
            state.user = action.user;
            this._localStorageService.user = state.user;
            this._notificationsService.clear();
            this._loadingService.off();
            this._reLoginService.retry();
        });

        this._reducers.set(ACTION.LOGOUT, (state: IStateModel, action: Readonly<IActionLogOutModel>) => {
            state.user = {} as IUserModel;
            this._localStorageService.user = state.user;
        });

        this._reducers.set(ACTION.ROUTE, (state: IStateModel, action: Readonly<IActionRouteModel>) => {
            state.url = action.url;
            state.urlParams = action.urlParams.filter(param => param.length > 0).map(param => param.toLowerCase());
            state.queryParams = action.queryParams;
            state.app = state.urlParams[0];
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

        this._reducers.set(ACTION.FAVORITE_TOGGLE, (state: IStateModel, action: Readonly<IActionFavoriteToggleModel>) => {
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
        this._http
            .post(environment.logInUrl, data)
            .pipe(
            map(this._userFromAuthResponse),
            tap((user: IUserModel) => this._actionSubject$.next({ type: ACTION.LOGIN, user, rememberMe })))
            .toPromise();
    }

    actionLogOut() {
        if (this._currentState.isLoggedIn) {
            this._actionSubject$.next({ type: ACTION.LOGOUT });
        }
    }

    actionFavoriteToggle(menuItem: IMenuModel) {
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

    actionMenu(urlParams: Array<string>, defaultToFirst: boolean = true) {
        if (defaultToFirst) {
            let item: IMenuModel | undefined;
            if (urlParams.length === 1) {
                item = this._currentState.menu.find(menu => menu.urlParams[0] === urlParams[0] && menu.urlParams.length > urlParams.length);
            }
            else if (urlParams.length === 2) {
                item = this._currentState.menu.find(menu => menu.urlParams[0] === urlParams[0] && menu.urlParams[1] === urlParams[1] && menu.urlParams.length > urlParams.length);
            }
            if (item) {
                urlParams = item.urlParams;
            }
        }
        this._router.navigate([urlParams.join('/')], { queryParams: { ...this._route.snapshot.queryParams, view: null } });
    }

    actionTcode(tcode: string) {
        if (tcode.trim().length === 0) return;

        const urlParams: Array<string> = this._currentState.menu
            .filter(menu => menu.isComponent)
            .filter(menu => menu.hasOwnProperty('tcode'))
            .filter(menu => menu.tcode.trim().toLowerCase() === tcode.toLowerCase())[0].urlParams;
        this.actionMenu(urlParams);
    }

    // current state getter to prevent direct state access
    get currentState(): Readonly<IStateModel> {
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
    }



    private _menuItemFromRoute(route: Route, index: number, routes: Array<Route>): IMenuModel {
        if (!route.path) return {} as IMenuModel;

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
        } as IMenuModel;
    }



    private _menuChildren(menuItem: IMenuModel, index: number, menu: Array<IMenuModel>): IMenuModel {
        menuItem.children = menu.filter(item => item.routerPath.startsWith(menuItem.routerPath) && item.urlParams.length === menuItem.urlParams.length + 1);
        return menuItem;
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
