import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../../../main/app.service';

@Component({
    selector: 'atlas-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    constructor(
        private _appService: AppService
    ) { }

    isLoggedIn$ = this._appService.state$.map(state => state.isLoggedIn);
}
