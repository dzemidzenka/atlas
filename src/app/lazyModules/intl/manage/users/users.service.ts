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

export interface IUser {
    accountType: string;
    authorizedTenantContexts: string[];
    claims: any[];
    email: string;
    exists: boolean;
    lockoutEnabled: boolean;
    name: string;
    phoneNumber: string;
    preferences: string[];
    preferredTenantContext: string;
    source: string;
    userName: string;
}

export interface IState {
    action: IAction;
    term: string;
    tenants: string[];
    claims: string[];
    users: IUser[];
    user: IUser | null;
    filteredUsers: IUser[];
    filteredUsersActiveDir: IUser[] | null;
}

type IAction = IActionInit | IActionSearch | IActionSearchActiveDir | IActionUserSelect | IActionUserUpdate;

interface IActionInit {
    type: ACTION;
    users: IUser[];
    tenants: string[];
    claims: string[];
}

interface IActionUserSelect {
    type: ACTION;
    user: IUser;
}

interface IActionUserUpdate {
    type: ACTION;
    user: IUser;
}

interface IActionSearch {
    type: ACTION;
    term: string;
}

interface IActionSearchActiveDir {
    type: ACTION;
    users: IUser[] | null;
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
    private _reducers = new Map<ACTION, (state: IState, action: any) => void>();
    private _actionSubject$ = new Subject<IAction>();
    private _inputCtrl$: Observable<IActionSearch> = this.inputCtrl.valueChanges.pipe(map((term: string) => ({ type: ACTION.SEARCH, term })));
    private _inputCtrlActiveDir$: Observable<IActionSearchActiveDir> = this.inputCtrlActiveDir.valueChanges.pipe(
        debounceTime(environment.debounceTime),
        map((term: string) => term.trim()),
        distinctUntilChanged(),
        tap(() => this._loadingService.on()),
        switchMap((term: string) => term.length >= environment.minCharForHttpSearch ?
            this._http.get<IUser[] | null>(`${environment.users.users}/search/${term}?index=0&limit=20`) :
            Observable.of(null)
        ),
        map((users: IUser[] | null) => ({ type: ACTION.SEARCH_ACTIVE_DIR, users })),
        tap(() => this._loadingService.off()));



    // USERS STATE STORE
    state$: Observable<IState> = this._actionSubject$.pipe(
        merge(this._inputCtrl$, this._inputCtrlActiveDir$),
        scan((state: IState, action: Readonly<IAction>) => this._reducer(state, action), this._initializeState()),
        publishBehavior(this._initializeState()),
        refCount());



    // REDUCER HANDLER
    private _reducer(state: IState, action: Readonly<IAction>): IState {
        const _state = cloneDeep(state);
        const _action = cloneDeep(action);
        this._reducers.get(_action.type)!(_state, _action);
        _state.action = _action;
        return _state;
    }





    private _initializeReducers() {
        this._reducers.set(ACTION.INIT, (state: IState, action: Readonly<IActionInit>) => {
            state.users = action.users;
            state.tenants = action.tenants;
            state.claims = action.claims;
            state.filteredUsers = action.users;
            state.user = null;
        });

        this._reducers.set(ACTION.USER_SELECT, (state: IState, action: Readonly<IActionUserSelect>) => {
            state.user = action.user;
        });

        this._reducers.set(ACTION.USER_UPDATE, (state: IState, action: Readonly<IActionUserUpdate>) => {
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

        this._reducers.set(ACTION.SEARCH, (state: IState, action: Readonly<IActionSearch>) => {
            state.user = null;
            state.filteredUsers = action.term ? state.users.filter(user => user.name.toLowerCase().includes(action.term.toLowerCase())) : state.users;
        });

        this._reducers.set(ACTION.SEARCH_ACTIVE_DIR, (state: IState, action: Readonly<IActionSearchActiveDir>) => {
            state.user = null;
            state.filteredUsersActiveDir = action.users;
        });
    }


    private _initializeState(): IState {
        return Object.freeze({
            action: {} as IAction,
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
        const users$: Observable<IUser[]> = this._http.get<IUser[]>(environment.users.users);
        const tenants$: Observable<string[]> = this._http.get<string[]>(environment.users.tenants);
        const claims$: Observable<string[]> = this._http.get<string[]>(environment.users.claims);

        Observable
            .forkJoin(users$, tenants$, claims$)
            .toPromise()
            .then((responses: [IUser[], string[], string[]]) => {
                const [users, tenants, claims] = responses;
                this._actionSubject$.next({ type: ACTION.INIT, users, tenants, claims });
            })
            .then(() => this._loadingService.off());


        // Promise.all([
        //     this._http.get<IUser[]>(environment.users.users).toPromise(),
        //     this._http.get<string[]>(environment.users.tenants).toPromise(),
        //     this._http.get<string[]>(environment.users.claims).toPromise()
        // ]).then((responses: any[]) => {
        //     const [users, tenants, claims] = responses;
        //     this._actionSubject$.next({ type: ACTION.INIT, users, tenants, claims });
        // }).then(() => this._loadingService.off());
    }

    actionUserSelect(user: IUser) {
        this._actionSubject$.next({ type: ACTION.USER_SELECT, user });
    }

    actionUserUpdate(userUpdateData: any) {
        this._loadingService.on();
        this._http
            .put<IUser>(`${environment.users.users}/${userUpdateData.userName}`, JSON.stringify(userUpdateData), {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
            .toPromise()
            .then((user: IUser) => this._actionSubject$.next({ type: ACTION.USER_UPDATE, user }))           // there is a bug on API side that nulls the new tenants
            .then(() => this._notificationsService.notifySingle('Updated successfully'))
            .then(() => this._loadingService.off());
    }
}
