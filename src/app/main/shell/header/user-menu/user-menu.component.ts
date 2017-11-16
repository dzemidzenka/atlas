import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '@main/app.service';

@Component({
    selector: 'atlas-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
    constructor(
        public _appService: AppService
    ) { }

    profile() {
        alert('not done yet');
    }

    logOut() {
        this._appService.actionLogOut();
    }
}
