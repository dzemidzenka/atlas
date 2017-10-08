import { Component, Input, HostBinding, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

export enum TdNotificationCountPositionY {
  Top = <any>'top',
  Bottom = <any>'bottom',
  Center = <any>'center',
}

export enum TdNotificationCountPositionX {
  Before = <any>'before',
  After = <any>'after',
  Center = <any>'center',
}



@Component({
  selector: 'atlas-notification-count',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCountComponent {

  private _notifications: number | boolean = 0;
  private _positionY: TdNotificationCountPositionY;
  private _positionX: TdNotificationCountPositionX;


  @ViewChild('content') content: ElementRef;



  @Input()
  set positionX(positionX: TdNotificationCountPositionX) {
    this._positionX = positionX;
  }
  get positionX(): TdNotificationCountPositionX {
    return this._positionX;
  }



  @Input()
  set notifications(notifications: number | boolean) {
    this._notifications = notifications;
  }

  @HostBinding('class.td-notification-hidden')
  get hideHost(): boolean {
    return !this.show && !this._hasContent();
  }


  get noCount(): string | boolean {
    return this._notifications === true;
  }

  /**
  * Notification display string when a count is available.
  * Anything over 99 gets set as 99+
  */
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
