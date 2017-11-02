import * as models from '../shared/models';

export default function() {
    this._reducers[models.ACTION.NOTIFICATION] = (state: models.IStateModel, action: models.IActionModel) => {
        action.notifications
            .map((notification: models.INotificationModel) => {
                notification.date = Date.now();
                return notification;
            })
            .forEach(notification => {
                state.notifications.push(notification);
                this._notificationsService.info(notification.message);
            });
    };
}
