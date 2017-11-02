import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import pick from 'lodash-es/pick';
import { FormControl } from '@angular/forms';
import { LoadingService } from '../../../../providers/loading.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

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
export class UsersComponent implements OnInit {
    constructor(private _http: HttpClient, private _loadingService: LoadingService) {}

    usersActiveDir$: Observable<any>;
    users$: Observable<any>;
    user: IUser;
    userPartial: Partial<IUser>;

    inputCtrl: FormControl;
    inputCtrlActiveDir: FormControl;
    filteredUser$: Observable<Array<IUser>>;
    filteredUsersActiveDir$: Observable<Array<IUser>>;
    users: Array<IUser>;
    usersActiveDir: Array<IUser>;

    ngOnInit() {
        this._loadingService.on();

        this.users$ = this._http
            .get<Array<IUser>>('http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users')
            .do(users => (this.users = users))
            .do(() => this._loadingService.off())
            .catch((errorResponse: HttpErrorResponse) => {
                console.log('HTTP ERROR', errorResponse);
                return Observable.throw(errorResponse.message);
            })
            .shareReplay();

        this.inputCtrl = new FormControl();
        this.inputCtrlActiveDir = new FormControl();

        this.filteredUser$ = this.users$.concatMap(users =>
            this.inputCtrl.valueChanges
                .startWith(null)
                .debounceTime(250)
                .distinctUntilChanged()
                .map(searchTerm => (searchTerm ? users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())) : users))
        );
    }

    onClick(user: IUser) {
        this.user = user;
        this.userPartial = pick(user, ['userName', 'email', 'preferredTenantContext', 'authorizedTenantContexts', 'claims.Role']);
    }

    onSelect(name: string) {
        this.user = this.users.find(u => u.name === name);
        this.inputCtrl.setValue(null);
    }

    onSelectActiveDir(name: string) {
      this.user = this.usersActiveDir.find(u => u.name === name);
      this.inputCtrlActiveDir.setValue(null);
    }

    onSelectedTabChange(tabGroup: MatTabChangeEvent) {
        this.user = null;
        if (tabGroup.index === 0) {
            return;
        }
        if (this.usersActiveDir) {
            return;
        }

        this.usersActiveDir$ = this._http
            .get<Array<IUser>>('http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/search/tom?index=0')
            .do(users => (this.usersActiveDir = users))
            .catch((errorResponse: HttpErrorResponse) => {
                console.log('HTTP ERROR', errorResponse);
                return Observable.throw(errorResponse.message);
            })
            .shareReplay();

        this.filteredUsersActiveDir$ = this.usersActiveDir$.concatMap(users =>
            this.inputCtrlActiveDir.valueChanges
                .startWith(null)
                .debounceTime(250)
                .distinctUntilChanged()
                .map(searchTerm => (searchTerm ? users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())) : users))
        );
    }
}
