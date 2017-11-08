import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NotificationsService } from 'angular2-notifications';

export interface INotificationModel {
    message: string;
    date?: number;
}


@Injectable()
export class NotificationService {
    constructor(
        private _notificationsService: NotificationsService
    ) { }

    private _subject$ = new BehaviorSubject<Array<INotificationModel>>([]);
    notifications$: Observable<Array<INotificationModel>> = this._subject$.asObservable();
    notifications: Array<INotificationModel> = [];

    notify(notifications: Array<INotificationModel>) {
        notifications
            .map((notification: INotificationModel) => {
                notification.date = Date.now();
                return notification;
            })
            .forEach(notification => {
                this.notifications.push(notification);
                this._notificationsService.info(notification.message);
            });
        this._subject$.next(this.notifications);
    }

    notifySingle(message: string) {
        this.notify([{ message: message }])
    }

    clear() {
        this.notifications = [];
        this._subject$.next(this.notifications);
    }
}
