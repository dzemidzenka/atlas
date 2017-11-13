import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LoadingService } from '../../../../shared/providers/loading.service';
import { NotificationService } from '../../../../shared/providers/notification.service';
// import { ReLoginService } from '../../../../shared/providers/re-login.service';
import { environment } from '../../../../../environments/environment';
import cloneDeep from 'lodash-es/cloneDeep';

export enum ACTION {
    INIT = 'INIT',
    USER_SELECT = 'USER_SELECT',
    USER_UPDATE = 'USER_UPDATE',
    SEARCH = 'SEARCH',
    SEARCH_ACTIVE_DIR = 'SEARCH_ACTIVE_DIR'
}

export type IUser = {
    accountType: string;
    authorizedTenantContexts: Array<string>;
    claims: Array<any>;
    email: string;
    exists: boolean;
    lockoutEnabled: boolean;
    name: string;
    phoneNumber: string;
    preferences: Array<string>;
    preferredTenantContext: string;
    source: string;
    userName: string;
}

export type IStateModel = {
    action: IActionModel;
    term: string;
    tenants: Array<string>;
    claims: Array<string>;
    users: Array<IUser>;
    user: IUser | null;
    filteredUsers: Array<IUser>;
    filteredUsersActiveDir: Array<IUser>;
}

type IActionModel = IActionSearchModel | IActionSearchActiveDirModel | IActionUserSelectModel | IActionInitModel;

type IActionType = {
    readonly type: ACTION;
}

interface IActionInitModel extends IActionType {
    readonly tenants: Array<string>;
    readonly users: Array<IUser>;
    readonly claims: Array<string>;
}

interface IActionUserSelectModel extends IActionType {
    readonly user: IUser;
}

interface IActionUserUpdateModel extends IActionType {
    readonly user: IUser;
}

interface IActionSearchModel extends IActionType {
    readonly term: string;
}

interface IActionSearchActiveDirModel extends IActionType {
    readonly users: Array<IUser>;
}




@Injectable()
export class UsersService {
    constructor(
        private _http: HttpClient,
        private _loadingService: LoadingService,
        private _notificationsService: NotificationService,
        // private _reLoginService: ReLoginService,
    ) {
        this._initializeReducers();
        this.state$.subscribe(state => console.log('Users state', state));
        this._actionInit();
    }

    inputCtrl = new FormControl();
    inputCtrlActiveDir = new FormControl();
    private _currentState: IStateModel;
    private _reducers: Array<Function> = [];
    private _actionSubject$ = new Subject<IActionModel>();
    private _inputCtrl$: Observable<string> = this.inputCtrl.valueChanges.map(term => Object.assign({ type: ACTION.SEARCH, term: term }));
    private _filteredUsersActiveDir$: Observable<Array<IUser>> = this.inputCtrlActiveDir.valueChanges
        .debounceTime(environment.debounceTime)
        .map(term => term.trim())
        .distinctUntilChanged()
        // .merge(c => this._reLoginService.retry$.switchMap(() =>
        //     this._http
        //         .get<Array<IUser>>(`http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/search/${searchTerm}?index=0&limit=20`)
        //         .do(users => this.usersActiveDir = users)
        //         .do(() => this._loadingService.off())
        // ))
        // .filter(searchTerm => searchTerm && searchTerm.length >= environment.minCharForHttpSearch)
        // .do(() => this.user = null)
        .do(() => this._loadingService.on())
        .switchMap(term => {
            if (term.length >= environment.minCharForHttpSearch) {
                return this._http.get<Array<IUser>>(`${environment.users.users}/search/${term}?index=0&limit=20`)
            } else {
                return Observable.of([null])
            }
        })
        .do(() => this._loadingService.off())
        .map(users => Object.assign({ type: ACTION.SEARCH_ACTIVE_DIR, users: users }))
        .repeat();

        

    // USERS STATE STORE
    state$: Observable<IStateModel> = this._actionSubject$
        .merge(this._inputCtrl$, this._filteredUsersActiveDir$)
        .scan((state: IStateModel, action: IActionModel) => this._reducer(state, action), {} as IStateModel)
        .do(state => this._currentState = state)
        .publishBehavior({})
        .refCount() as Observable<IStateModel>;



    // REDUCER HANDLER
    private _reducer(state: IStateModel, action: IActionModel) {
        const _state = cloneDeep(state);
        if (action.type in ACTION) {
            const _action = cloneDeep(action);
            this._reducers[_action.type].call(this, _state, _action);
            _state.action = _action;
        }
        return _state;
    }





    private _initializeReducers() {
        this._reducers[ACTION.INIT] = (state: IStateModel, action: IActionInitModel) => {
            state.tenants = action.tenants;
            state.users = action.users;
            state.claims = action.claims;
            state.filteredUsers = [];
            state.filteredUsers = action.users;
            state.filteredUsersActiveDir = [];
            state.user = null;
        };

        this._reducers[ACTION.USER_SELECT] = (state: IStateModel, action: IActionUserSelectModel) => {
            state.user = action.user;
        };

        this._reducers[ACTION.USER_UPDATE] = (state: IStateModel, action: IActionUserUpdateModel) => {
            state.user = action.user;
            let index = state.filteredUsers.findIndex(u => u.userName === action.user.userName);
            if (index === -1) {
                state.users.push(action.user);
                state.filteredUsers.push(action.user);
            } else {
                state.filteredUsers[index] = action.user;
            }

            index = state.filteredUsersActiveDir.findIndex(u => u.userName === action.user.userName);
            if (index !== -1) {
                state.filteredUsersActiveDir[index] = action.user;
            }
        };

        this._reducers[ACTION.SEARCH] = (state: IStateModel, action: IActionSearchModel) => {
            state.user = null;
            state.filteredUsers = action.term ? state.users.filter(user => user.name.toLowerCase().includes(action.term.toLowerCase())) : state.users;
        };

        this._reducers[ACTION.SEARCH_ACTIVE_DIR] = (state: IStateModel, action: IActionSearchActiveDirModel) => {
            state.user = null;
            state.filteredUsersActiveDir = action.users;
        };
    }



    // REDUX ACTIONS
    private _actionInit() {
        const tenants$: Observable<Array<string>> = this._http.get<Array<string>>(environment.users.tenants);
        const users$: Observable<Array<IUser>> = this._http.get<Array<IUser>>(environment.users.users);
        const claims$: Observable<Array<string>> = this._http.get<Array<string>>(environment.users.claims);

        Observable
            .forkJoin([tenants$, users$, claims$])
            .do(() => this._loadingService.off())
            .do(responses => {
                const tenants: Array<string> = Object.assign(responses[0]);
                const users: Array<IUser> = Object.assign(responses[1]);
                const claims: Array<string> = Object.assign(responses[2]);
                this._actionSubject$.next({ type: ACTION.INIT, tenants: tenants, users: users, claims: claims });
            })
            .toPromise();
    }

    actionUserSelect(user: IUser) {
        this._actionSubject$.next({ type: ACTION.USER_SELECT, user: user });
    }

    actionUserUpdate(userUpdateData: any) {
        this._loadingService.on()
        this._http
            .put(`${environment.users.users}/${userUpdateData.userName}`, JSON.stringify(userUpdateData), {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
            .do((user: IUser) => this._actionSubject$.next({ type: ACTION.USER_UPDATE, user: user }))           // there is a bug on API side that nulls the new tenants
            .do(() => this._notificationsService.notifySingle('Updated successfully'))
            .do(() => this._loadingService.off())
            .toPromise();
    }
}
