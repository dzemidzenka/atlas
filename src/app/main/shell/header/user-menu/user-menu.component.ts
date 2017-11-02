import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../../providers/redux.service';

@Component({
    selector: 'atlas-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
    constructor(public _reduxService: ReduxService) {}

    profile() {
        alert('not done yet');
    }

    logOut() {
        this._reduxService.actionLogOut();
    }
}
