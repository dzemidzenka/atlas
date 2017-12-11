import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { MatTabChangeEvent } from '@angular/material/tabs';
import { UsersService, IUserModel } from './users.service';


@Component({
    selector: 'atlas-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
    constructor(
        private _usersService: UsersService
    ) { }

    state$ = this._usersService.state$;
    inputCtrl = this._usersService.inputCtrl;
    inputCtrlActiveDir = this._usersService.inputCtrlActiveDir;


    // onSelectedTabChange(tabGroup: MatTabChangeEvent) {
    onSelectedTabChange() {
        // this.user = null;
        // this._usersService.actionUser(null);
    }

    onUserSelect(user: IUserModel) {
        this._usersService.actionUserSelect(user);
    }

    onUserUpdate(data: any) {
        this._usersService.actionUserUpdate(data);
    }
}
