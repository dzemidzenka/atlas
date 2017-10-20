import { Component, Input, HostBinding, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'atlas-notification-count',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCountComponent {

  private _notifications: number | boolean = 0;

  @ViewChild('content') content: ElementRef;


  @Input() set notifications(notifications: number | boolean) {
    this._notifications = notifications;
  }

  @HostBinding('class.notification-hidden') get hideHost(): boolean {
    return !this.show && !this._hasContent();
  }


  get noCount(): string | boolean {
    return this._notifications === true;
  }


  get notificationsDisplay(): string {
    if (this._notifications > 99) {
      return '99+';
    }
    return this._notifications.toString();
  }


  get show(): boolean {
    return this._notifications === true || (!isNaN(<any>this._notifications) && this._notifications > 0);
  }


  private _hasContent(): boolean {
    if (this.content) {
      const contentElement: HTMLElement = this.content.nativeElement;
      return contentElement && (contentElement.children.length > 0 || !!contentElement.textContent.trim());
    }
    return false;
  }
}
