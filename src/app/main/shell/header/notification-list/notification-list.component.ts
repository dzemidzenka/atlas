import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from '@shared/providers/notification.service';

@Component({
    selector: 'atlas-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationListComponent {
    constructor(
        private _notificationService: NotificationService
    ) {}

    notifications$ = this._notificationService.notifications$;

    clearNotifications() {
        this._notificationService.clear();
    }
}
