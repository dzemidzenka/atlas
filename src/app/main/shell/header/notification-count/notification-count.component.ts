import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NotificationListComponent } from '../notification-list/notification-list.component';


@Component({
  selector: 'atlas-notification-count',
  templateUrl: './notification-count.component.html',
  styleUrls: ['./notification-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCountComponent {
  componentRef = NotificationListComponent;
  @Input() notifications: number;

  get notificationsDisplay(): string {
    if (this.notifications > 99) {
      return '99+';
    }
    return this.notifications.toString();
  }
}
