import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NotificationsService } from 'angular2-notifications';
import cloneDeep from 'lodash-es/cloneDeep';

import { INotificationModel } from '../shared/models';

enum ACTION {
    NOTIFICATION = 'NOTIFICATION',
    NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR'
}
interface IActionModel {
    type: ACTION;
    notifications?: Array<INotificationModel>;
}

@Injectable()
export class NotificationService {
    constructor(private _notificationsService: NotificationsService) {
        this._initReducers();
    }

    private _reducers: Array<Function> = [];
    private _actionSubject$ = new Subject<IActionModel>();

    // APPLICATION STATE STORE
    notifications$: Observable<Array<INotificationModel>> = this._actionSubject$
        .scan((notifications: Array<INotificationModel>, action: IActionModel) => this._reducer(notifications, action), [])
        .publishBehavior({})
        .refCount() as Observable<Array<INotificationModel>>;

    // REDUCER HANDLER
    private _reducer(notifications: Array<INotificationModel>, action: IActionModel) {
        const _notifications = cloneDeep(notifications);
        if (action.type in ACTION) {
            const _action = cloneDeep(action);
            this._reducers[_action.type].call(this, _notifications, _action);
        }
        return _notifications;
    }

    private _initReducers() {
        this._reducers[ACTION.NOTIFICATION] = (notifications: Array<INotificationModel>, action: IActionModel) => {
            action.notifications
                .map((notification: INotificationModel) => {
                    notification.date = Date.now();
                    return notification;
                })
                .forEach(notification => {
                    notifications.push(notification);
                    this._notificationsService.info(notification.message);
                });
        };

        this._reducers[ACTION.NOTIFICATION_CLEAR] = (notifications: Array<INotificationModel>, action: IActionModel) => {
            notifications = [];
        };
    }

    actionNotify(notifications: Array<INotificationModel>) {
        this._actionSubject$.next({ type: ACTION.NOTIFICATION, notifications: notifications });
    }

    actionClearNotifications() {
        this._actionSubject$.next({ type: ACTION.NOTIFICATION_CLEAR });
    }
}
