import * as models from '../shared/models';
import isEmpty from 'lodash-es/isEmpty';

export default function() {
    this._reducers[models.ACTION.LOGOUT] = (state: models.IStateModel, action: models.IActionModel) => {
        localStorage.removeItem(this._lsAuth);
        if (action.notifications.length > 0) {
            action.notifications.forEach(notification => this._notificationsService.info(notification.message, null, { timeOut: 0 }));
        } else {
            if (isEmpty(state.user)) {
                this._notificationsService.info('Logged out. Goodbye!');
            } else {
                this._notificationsService.info(`${state.user.nameDisplay} logged out. Goodbye!`);
            }
        }

        state.user = {} as models.IUserModel;
        state.isLoggedIn = false;

        const queryParams = {
            country: state.country,
            language: state.language,
            view: state.view
        };
        if (state.urlParams.length > 0) {
            queryParams['returnUrl'] = state.urlParams.join('/');
        }
        this._router.navigate([''], { queryParams: { ...queryParams } });
    };
}
