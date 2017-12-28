import { Component, OnChanges, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { IUser } from '../users.service';
import cloneDeep from 'lodash-es/cloneDeep';


@Component({
  selector: 'atlas-user-change',
  templateUrl: './user-change.component.html',
  styleUrls: ['./user-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserChangeComponent implements OnChanges {
  @Input() user: IUser;
  @Input() tenants: string[];
  @Input() claims: string[];
  @Output() userUpdated: EventEmitter<IUser> = new EventEmitter();
  userForm: FormGroup;


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

    const claims: { key: string, value: string }[] = [];
    Object.entries(_user.claims).forEach(claim => claim[1].forEach((value: string) => claims.push({ 'key': claim[0], 'value': value })));
    _user.claims = claims;
    const data = Object.assign(_user, this.userForm.value);
    delete data['tenants'];

    data.authorizedTenantContexts = [];
    this.userForm.value.tenants.forEach((selected: string, i: number) => selected ? data.authorizedTenantContexts.push(this.tenants[i]) : null);

    this.userUpdated.emit(data);
  }
}
