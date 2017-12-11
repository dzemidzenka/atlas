import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { LoadingService } from '@shared/providers/loading.service';
import { NotificationService } from '@shared/providers/notification.service';
import { environment } from '@env';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { merge } from 'rxjs/operators/merge';
import { scan } from 'rxjs/operators/scan';
import { publishBehavior } from 'rxjs/operators/publishBehavior';
import { refCount } from 'rxjs/operators/refCount';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { tap } from 'rxjs/operators/tap';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/operators/switchMap';
import cloneDeep from 'lodash-es/cloneDeep';

enum ACTION {
    INIT = 'INIT',
    USER_SELECT = 'USER_SELECT',
    USER_UPDATE = 'USER_UPDATE',
    SEARCH = 'SEARCH',
    SEARCH_ACTIVE_DIR = 'SEARCH_ACTIVE_DIR'
}

export interface IUserModel {
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

export interface IStateModel {
    action: IActionModel;
    term: string;
    tenants: Array<string>;
    claims: Array<string>;
    users: Array<IUserModel>;
    user: IUserModel | null;
    filteredUsers: Array<IUserModel>;
    filteredUsersActiveDir: Array<IUserModel> | null;
}

type IActionModel = IActionInitModel | IActionSearchModel | IActionSearchActiveDirModel | IActionUserSelectModel | IActionUserUpdateModel;

interface IActionInitModel {
    type: ACTION;
    users: Array<IUserModel>;
    tenants: Array<string>;
    claims: Array<string>;
}

interface IActionUserSelectModel {
    type: ACTION;
    user: IUserModel;
}

interface IActionUserUpdateModel {
    type: ACTION;
    user: IUserModel;
}

interface IActionSearchModel {
    type: ACTION;
    term: string;
}

interface IActionSearchActiveDirModel {
    type: ACTION;
    users: Array<IUserModel> | null;
}




@Injectable()
export class UsersService {
    constructor(
        private _http: HttpClient,
        private _loadingService: LoadingService,
        private _notificationsService: NotificationService,
    ) {
        this.state$.subscribe(state => console.log('Users state', state));
        this._initializeReducers();
        this._actionInit();
    }

    inputCtrl = new FormControl();
    inputCtrlActiveDir = new FormControl();
    private _reducers = new Map<ACTION, (state: IStateModel, action: any) => void>();
    private _actionSubject$ = new Subject<IActionModel>();
    private _inputCtrl$: Observable<IActionSearchModel> = this.inputCtrl.valueChanges.pipe(map((term: string) => ({ type: ACTION.SEARCH, term })));
    private _inputCtrlActiveDir$: Observable<IActionSearchActiveDirModel> = this.inputCtrlActiveDir.valueChanges.pipe(
        debounceTime(environment.debounceTime),
        map((term: string) => term.trim()),
        distinctUntilChanged(),
        tap(() => this._loadingService.on()),
        switchMap((term: string) => term.length >= environment.minCharForHttpSearch ?
            this._http.get<Array<IUserModel> | null>(`${environment.users.users}/search/${term}?index=0&limit=20`) :
            Observable.of(null)
        ),
        map((users: Array<IUserModel> | null) => ({ type: ACTION.SEARCH_ACTIVE_DIR, users })),
        tap(() => this._loadingService.off()));



    // USERS STATE STORE
    state$: Observable<IStateModel> = this._actionSubject$.pipe(
        merge(this._inputCtrl$, this._inputCtrlActiveDir$),
        scan((state: IStateModel, action: Readonly<IActionModel>) => this._reducer(state, action), this._initializeState()),
        publishBehavior(this._initializeState()),
        refCount());



    // REDUCER HANDLER
    private _reducer(state: IStateModel, action: Readonly<IActionModel>): IStateModel {
        const _state = cloneDeep(state);
        const _action = cloneDeep(action);
        this._reducers.get(_action.type)!(_state, _action);
        _state.action = _action;
        return _state;
    }





    private _initializeReducers() {
        this._reducers.set(ACTION.INIT, (state: IStateModel, action: Readonly<IActionInitModel>) => {
            state.users = action.users;
            state.tenants = action.tenants;
            state.claims = action.claims;
            state.filteredUsers = action.users;
            state.user = null;
        });

        this._reducers.set(ACTION.USER_SELECT, (state: IStateModel, action: Readonly<IActionUserSelectModel>) => {
            state.user = action.user;
        });

        this._reducers.set(ACTION.USER_UPDATE, (state: IStateModel, action: Readonly<IActionUserUpdateModel>) => {
            state.user = action.user;
            let index = state.filteredUsers.findIndex(u => u.userName === action.user.userName);
            if (index === -1) {
                state.users.push(action.user);
                state.filteredUsers.push(action.user);
            } else {
                state.filteredUsers[index] = action.user;
            }

            if (state.filteredUsersActiveDir) {
                index = state.filteredUsersActiveDir.findIndex(u => u.userName === action.user.userName);
                if (index !== -1) {
                    state.filteredUsersActiveDir[index] = action.user;
                }
            }
        });

        this._reducers.set(ACTION.SEARCH, (state: IStateModel, action: Readonly<IActionSearchModel>) => {
            state.user = null;
            state.filteredUsers = action.term ? state.users.filter(user => user.name.toLowerCase().includes(action.term.toLowerCase())) : state.users;
        });

        this._reducers.set(ACTION.SEARCH_ACTIVE_DIR, (state: IStateModel, action: Readonly<IActionSearchActiveDirModel>) => {
            state.user = null;
            state.filteredUsersActiveDir = action.users;
        });
    }


    private _initializeState(): IStateModel {
        return Object.freeze({
            action: {} as IActionModel,
            term: '',
            tenants: [],
            claims: [],
            users: [],
            user: null,
            filteredUsers: [],
            filteredUsersActiveDir: [],
        });
    }


    // REDUX ACTIONS
    private _actionInit() {
        this._loadingService.on()
        const users$: Observable<Array<IUserModel>> = this._http.get<Array<IUserModel>>(environment.users.users);
        const tenants$: Observable<Array<string>> = this._http.get<Array<string>>(environment.users.tenants);
        const claims$: Observable<Array<string>> = this._http.get<Array<string>>(environment.users.claims);

        Observable
            .forkJoin(users$, tenants$, claims$)
            .toPromise()
            .then((responses: [Array<IUserModel>, Array<string>, Array<string>]) => {
                const [users, tenants, claims] = responses;
                this._actionSubject$.next({ type: ACTION.INIT, users, tenants, claims });
            })
            .then(() => this._loadingService.off());


        // Promise.all([
        //     this._http.get<Array<IUserModel>>(environment.users.users).toPromise(),
        //     this._http.get<Array<string>>(environment.users.tenants).toPromise(),
        //     this._http.get<Array<string>>(environment.users.claims).toPromise()
        // ]).then((responses: Array<any>) => {
        //     const [users, tenants, claims] = responses;
        //     this._actionSubject$.next({ type: ACTION.INIT, users, tenants, claims });
        // }).then(() => this._loadingService.off());
    }

    actionUserSelect(user: IUserModel) {
        this._actionSubject$.next({ type: ACTION.USER_SELECT, user });
    }

    actionUserUpdate(userUpdateData: any) {
        this._loadingService.on();
        this._http
            .put<IUserModel>(`${environment.users.users}/${userUpdateData.userName}`, JSON.stringify(userUpdateData), {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
            .toPromise()
            .then((user: IUserModel) => this._actionSubject$.next({ type: ACTION.USER_UPDATE, user }))           // there is a bug on API side that nulls the new tenants
            .then(() => this._notificationsService.notifySingle('Updated successfully'))
            .then(() => this._loadingService.off());
    }
}
