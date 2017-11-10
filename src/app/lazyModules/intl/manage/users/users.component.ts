import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { LoadingService } from '../../../../shared/providers/loading.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ReLoginService } from '../../../../shared/providers/re-login.service';
import { environment } from '../../../../../environments/environment';


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

@Component({
    selector: 'atlas-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
    constructor(
        private _http: HttpClient,
        private _loadingService: LoadingService,
        private _reLoginService: ReLoginService,
    ) { }

    user: IUser | null;
    users: Array<IUser>;
    inputCtrl = new FormControl();
    inputCtrlActiveDir = new FormControl();
    updateSubject$ = new Subject();


    tenants$ = this._http
        .get<Array<string>>('http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/tenants?q=names')
        .shareReplay();



    users$: Observable<Array<IUser>> = this._http
        .get<Array<IUser>>('http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users')
        .do(users => this.users = users)
        .do(() => this._loadingService.off())
        .shareReplay();



    filteredUsers$: Observable<Array<IUser>> = this.users$.concatMap(users =>
        this.inputCtrl.valueChanges
            .startWith(null)
            .do(() => this.user = null)
            .map(searchTerm => searchTerm ? users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())) : users)
    );

    filteredUsersActiveDir$: Observable<Array<IUser>> = this.inputCtrlActiveDir.valueChanges
        // .startWith('')
        .debounceTime(environment.debounceTime)
        .merge(this.updateSubject$)
        .map(searchTerm => searchTerm.trim())
        .distinctUntilChanged()
        // .merge(c => this._reLoginService.retry$.switchMap(() =>
        //     this._http
        //         .get<Array<IUser>>(`http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/search/${searchTerm}?index=0&limit=20`)
        //         .do(users => this.usersActiveDir = users)
        //         .do(() => this._loadingService.off())
        // ))
        // .filter(searchTerm => searchTerm && searchTerm.length >= environment.minCharForHttpSearch)
        .do(() => this.user = null)
        .switchMap(searchTerm => {
            if (searchTerm.length >= environment.minCharForHttpSearch) {
                this._loadingService.on();
                return this._http
                    .get<Array<IUser>>(`http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/search/${searchTerm}?index=0&limit=20`)
                    .do(() => this._loadingService.off())
            } else {
                return Observable.of([null])
                // return Observable.of(this.users)
            }
        });



    ngOnInit() {
        this.users$.subscribe;
    }


    onSelectedTabChange(tabGroup: MatTabChangeEvent) {
        this.user = null;
    }

    onUserSelect(user: IUser) {
        this.user = user;
    }


    onUserUpdate(user: IUser) {
        this.updateSubject$.next('');
        this.inputCtrlActiveDir.setValue('');
        this.onUserSelect(user);
        const index = this.users.findIndex(u => u.userName === user.userName);
        if (index === -1) {
            this.users.push(user);
        } else {
            this.users[index] = user;
        }
    }
}
