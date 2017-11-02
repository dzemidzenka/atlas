import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../providers/redux.service';

@Component({
    selector: 'atlas-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    constructor(private _reduxService: ReduxService) {}

    isLoggedIn$ = this._reduxService.state$.map(state => state.isLoggedIn);
}
