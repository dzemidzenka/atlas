import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LoadingService } from '../../../../shared/providers/loading.service';
import { NotificationService } from '../../../../shared/providers/notification.service';
import { environment } from '../../../../../environments/environment';
import cloneDeep from 'lodash-es/cloneDeep';

enum ACTION {
    INIT = 'INIT',
    USER_SELECT = 'USER_SELECT',
    USER_UPDATE = 'USER_UPDATE',
    SEARCH = 'SEARCH',
    SEARCH_ACTIVE_DIR = 'SEARCH_ACTIVE_DIR'
}

export interface IUser {
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
    users: Array<IUser>;
    user: IUser | null;
    filteredUsers: Array<IUser>;
    filteredUsersActiveDir: Array<IUser>;
}

type IActionModel = IActionInitModel | IActionSearchModel | IActionSearchActiveDirModel | IActionUserSelectModel | IActionUserUpdateModel;

interface IActionType {
    type: ACTION;
}

interface IActionInitModel extends IActionType {
    tenants: Array<string>;
    users: Array<IUser>;
    claims: Array<string>;
}

interface IActionUserSelectModel extends IActionType {
    user: IUser;
}

interface IActionUserUpdateModel extends IActionType {
    user: IUser;
}

interface IActionSearchModel extends IActionType {
    term: string;
}

interface IActionSearchActiveDirModel extends IActionType {
    users: Array<IUser>;
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
    private _reducers = new Map();
    private _actionSubject$ = new Subject<IActionModel>();
    private _inputCtrl$: Observable<IActionSearchModel> = this.inputCtrl.valueChanges.map(term => Object.assign({ type: ACTION.SEARCH, term: term }));
    private _inputCtrlActiveDir$: Observable<IActionSearchActiveDirModel> = this.inputCtrlActiveDir.valueChanges
        .debounceTime(environment.debounceTime)
        .map(term => term.trim())
        .distinctUntilChanged()
        .do(() => this._loadingService.on())
        .switchMap(term => {
            if (term.length >= environment.minCharForHttpSearch) {
                return this._http.get<Array<IUser>>(`${environment.users.users}/search/${term}?index=0&limit=20`);
            } else {
                return Observable.of([null]);
            }
        })
        .map(users => Object.assign({ type: ACTION.SEARCH_ACTIVE_DIR, users: users }))
        .do(() => this._loadingService.off());
    // .repeat();



    // USERS STATE STORE
    state$: Observable<IStateModel> = this._actionSubject$
        .merge(this._inputCtrl$, this._inputCtrlActiveDir$)
        .scan((state: IStateModel, action: IActionModel) => this._reducer(state, action), this._initializeState())
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
        return _state;
    }





    private _initializeReducers() {
        this._reducers.set(ACTION.INIT, (state: IStateModel, action: IActionInitModel) => {
            state.tenants = action.tenants;
            state.users = action.users;
            state.claims = action.claims;
            state.filteredUsers = action.users;
            state.user = null;
        });

        this._reducers.set(ACTION.USER_SELECT, (state: IStateModel, action: IActionUserSelectModel) => {
            state.user = action.user;
        });

        this._reducers.set(ACTION.USER_UPDATE, (state: IStateModel, action: IActionUserUpdateModel) => {
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
        });

        this._reducers.set(ACTION.SEARCH, (state: IStateModel, action: IActionSearchModel) => {
            state.user = null;
            state.filteredUsers = action.term ? state.users.filter(user => user.name.toLowerCase().includes(action.term.toLowerCase())) : state.users;
        });

        this._reducers.set(ACTION.SEARCH_ACTIVE_DIR, (state: IStateModel, action: IActionSearchActiveDirModel) => {
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
        const tenants$: Observable<Array<string>> = this._http.get<Array<string>>(environment.users.tenants);
        const users$: Observable<Array<IUser>> = this._http.get<Array<IUser>>(environment.users.users);
        const claims$: Observable<Array<string>> = this._http.get<Array<string>>(environment.users.claims);

        Observable
            .forkJoin([tenants$, users$, claims$])
            .do(responses => {
                const tenants: Array<string> = Object.assign(responses[0]);
                const users: Array<IUser> = Object.assign(responses[1]);
                const claims: Array<string> = Object.assign(responses[2]);
                this._actionSubject$.next({ type: ACTION.INIT, tenants: tenants, users: users, claims: claims });
            })
            .do(() => this._loadingService.off())
            .toPromise();
    }

    actionUserSelect(user: IUser) {
        this._actionSubject$.next({ type: ACTION.USER_SELECT, user: user });
    }

    actionUserUpdate(userUpdateData: any) {
        this._loadingService.on();
        this._http
            .put<IUser>(`${environment.users.users}/${userUpdateData.userName}`, JSON.stringify(userUpdateData), {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
            .do((user: IUser) => this._actionSubject$.next({ type: ACTION.USER_UPDATE, user: user }))           // there is a bug on API side that nulls the new tenants
            .do(() => this._notificationsService.notifySingle('Updated successfully'))
            .do(() => this._loadingService.off())
            .toPromise();
    }
}
