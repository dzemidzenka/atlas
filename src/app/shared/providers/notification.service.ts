import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NotificationsService } from 'angular2-notifications';

export interface INotification {
    message: string;
    date?: number;
}


@Injectable()
export class NotificationService {
    constructor(
        private _notificationsService: NotificationsService
    ) { }

    private _subject$ = new BehaviorSubject<INotification[]>([]);
    notifications$: Observable<INotification[]> = this._subject$.asObservable();
    notifications: INotification[] = [];

    notify(notifications: INotification[]) {
        notifications
            .map((notification: INotification) => {
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
        this.notify([{ message: message }]);
    }

    clear() {
        this.notifications = [];
        this._subject$.next(this.notifications);
    }
}
