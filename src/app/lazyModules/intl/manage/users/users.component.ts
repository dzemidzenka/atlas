import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import pick from 'lodash-es/pick';
import { FormControl } from '@angular/forms';
import { LoadingService } from '../../../../shared/providers/loading.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ReLoginService } from '../../../../shared/providers/re-login.service';
import { environment } from '../../../../../environments/environment';

interface IClaim {
    country: Array<Object>;
}

interface IUser {
    accountType: string;
    authorizedTenantContexts: Array<string>;
    claims: Array<IClaim>;
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
export class UsersComponent {
    constructor(
        private _http: HttpClient,
        private _loadingService: LoadingService,
        private _reLoginService: ReLoginService,
    ) { }

    // usersActiveDir$: Observable<any>;
    user: IUser;
    userPartial: Partial<IUser>;
    users: Array<IUser>;
    usersActiveDir: Array<IUser>;
    inputCtrl: FormControl = new FormControl();
    inputCtrlActiveDir: FormControl = new FormControl();


    users$ = this._http
        .get<Array<IUser>>('http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users')
        .do(users => this.users = users)
        .do(() => this._loadingService.off())
        .catch((errorResponse: HttpErrorResponse) => {
            console.log('HTTP ERROR', errorResponse);
            return Observable.throw(errorResponse.message);
        })
        .shareReplay();



    filteredUsers$: Observable<Array<IUser>> = this.users$.concatMap(users =>
        this.inputCtrl.valueChanges
            .startWith(null)
            .debounceTime(environment.debounceTime)
            .distinctUntilChanged()
            .map(searchTerm => (searchTerm ? users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())) : users))
    );

    filteredUsersActiveDir$: Observable<Array<IUser>> = this.inputCtrlActiveDir.valueChanges
        // .startWith(null)
        .do(() => this._loadingService.off())
        .debounceTime(environment.debounceTime)
        .distinctUntilChanged()
        // .merge(c => this._reLoginService.retry$.switchMap(() =>
        //     this._http
        //         .get<Array<IUser>>(`http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/search/${searchTerm}?index=0&limit=20`)
        //         .do(users => this.usersActiveDir = users)
        //         .do(() => this._loadingService.off())
        // ))
        // .do((a) => console.log(a))
        .filter(searchTerm => searchTerm && searchTerm.length > 2)
        .switchMap(searchTerm => {
            this._loadingService.on();
            return this._http
                .get<Array<IUser>>(`http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/search/${searchTerm}?index=0&limit=20`)
                .do(users => this.usersActiveDir = users)
                .do(() => this._loadingService.off())
                // .retryWhen(error => {
                //     console.log('retryWhen');

                //     return Observable.throw(this._reLoginService.retry$)
                // })        

                .catch((errorResponse: HttpErrorResponse) => Observable.throw(errorResponse.message));
        })
        .catch((errorResponse: HttpErrorResponse) => {
            this._loadingService.off()
            return Observable.of([{ name: 'No users found' }]);
        })
        // .retryWhen(error => Observable.throw(true))        
        .repeat();



    onClick(user: IUser) {
        this.user = user;
        // this.userPartial = pick(user, ['userName', 'email', 'preferredTenantContext', 'authorizedTenantContexts', 'claims.Role']);
    }

    onSelect(name: string) {
        this.user = this.users.find(u => u.name === name);
        this.inputCtrl.setValue(null);
    }

    onSelectActiveDir(name: string) {
        this.user = this.usersActiveDir.find(u => u.name === name);
        // this.inputCtrlActiveDir.setValue(null);
    }

    onSelectedTabChange(tabGroup: MatTabChangeEvent) {
        this.user = null;
        if (tabGroup.index === 0) {
            return;
        }
        if (this.usersActiveDir) {
            return;
        }

        // this.usersActiveDir$ = this._http
        //     .get<Array<IUser>>('http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/search/tom?index=0')
        //     .do(users => (this.usersActiveDir = users))
        //     .catch((errorResponse: HttpErrorResponse) => {
        //         console.log('HTTP ERROR', errorResponse);
        //         return Observable.throw(errorResponse.message);
        //     })
        //     .shareReplay();

        // this.filteredUsersActiveDir$ = this.usersActiveDir$.concatMap(users =>
        //     this.inputCtrlActiveDir.valueChanges
        //         .startWith(null)
        //         .debounceTime(250)
        //         .distinctUntilChanged()
        //         .map(searchTerm => (searchTerm ? users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())) : users))
        // );
    }
}
