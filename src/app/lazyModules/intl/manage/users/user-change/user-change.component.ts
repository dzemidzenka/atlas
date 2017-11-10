import { Component, OnChanges, OnDestroy, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IUser } from '../users.component';
import cloneDeep from 'lodash-es/cloneDeep';
import omit from 'lodash-es/omit';
import { NotificationService } from '../../../../../shared/providers/notification.service';
import { LoadingService } from '../../../../../shared/providers/loading.service';

@Component({
  selector: 'atlas-user-change',
  templateUrl: './user-change.component.html',
  styleUrls: ['./user-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserChangeComponent implements OnChanges, OnDestroy {
  constructor(
    private _http: HttpClient,
    private _notificationsService: NotificationService,
    private _loadingService: LoadingService,
  ) { }

  @Input() user: IUser;
  @Input() tenants: Array<string>;
  @Output() userUpdated: EventEmitter<IUser> = new EventEmitter();
  userForm: FormGroup;
  private _http$Subscription: Subscription;

  claims$ = this._http
    .get('http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/claims?q=[claimtypes,rolenames]')
    .shareReplay();


  ngOnChanges() {
    this.userForm = new FormGroup(
      {
        name: new FormControl(this.user.name, Validators.required),
        userName: new FormControl({ value: this.user.userName, disabled: true }),
        phoneNumber: new FormControl(this.user.phoneNumber, Validators.required),
        tenants: new FormArray([])
      },
      {
        updateOn: 'submit'
      }
    );
    if (this.tenants && this.user.authorizedTenantContexts) {
      this.tenants.forEach(tenant => (<FormArray>this.userForm.get('tenants')).push(
        this.user.authorizedTenantContexts.includes(tenant) ? new FormControl(true) : new FormControl(false)
      ));
    }
  }


  update() {
    this._loadingService.on()
    const _user = cloneDeep(this.user);

    // const claims = [
    //   { key: 'Country', value: 'US' },
    //   { key: 'MobilePhone', value: '858-353-7696' },
    //   { key: 'GivenName', value: 'Steve Dzemidzenka' },
    //   { key: 'NameIdentifier', value: '261a42d1-fcb4-4e25-974f-287ba78ac973' },
    //   { key: 'NameIdentifier', value: 'f58d9e32-b141-4e4c-9eb9-521060755917' },
    //   { key: 'Name', value: 'sdzemidzenka' },
    //   { key: 'Role', value: 'Default' },
    //   { key: 'Role', value: 'GlobalAdmin' }
    // ];

    const claims: Array<{key, value}> = [];
    Object.entries(_user.claims).forEach(claim => claim[1].forEach(value => claims.push({ 'key': claim[0], 'value': value })));
    _user.claims = claims;
    const data = Object.assign(_user, omit(this.userForm.value, ['tenants']));

    data.authorizedTenantContexts = [];
    this.userForm.value.tenants.forEach((selected, i) => selected ? data.authorizedTenantContexts.push(this.tenants[i]) : null);
   
    this._http$Subscription = this._http
      .put('http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/' + _user.userName, JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .do(() => this._notificationsService.notifySingle('Updated successfully'))
      .do((res: IUser) => this.userUpdated.emit(res))           // there is a bug on API side that nulls the new tenants
      // .do((res: IUser) => console.log('reposnse', res))
      .do(() => this._loadingService.off())
      // .do((res: IUser) => merge(this.user, res))
      .subscribe();
  }

  ngOnDestroy() {
    if (this._http$Subscription) {
      this._http$Subscription.unsubscribe();
    }
  }
}
