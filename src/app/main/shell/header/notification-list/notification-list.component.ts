import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../../providers/redux.service';

@Component({
    selector: 'atlas-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationListComponent {
    constructor(private _reduxService: ReduxService) {}

    notifications$ = this._reduxService.state$.map(state => state.notifications || []);

    clearNotifications() {
        this._reduxService.actionClearNotifications();
    }
}
