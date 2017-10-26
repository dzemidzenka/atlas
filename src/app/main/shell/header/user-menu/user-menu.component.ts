import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../../providers/auth.service';

@Component({
    selector: 'atlas-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
    constructor(public _authService: AuthService) {}

    profile() {
        alert('not done yet');
    }

    logOut() {
        this._authService.logOut();
    }
}
