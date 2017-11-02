import * as models from '../shared/models';

export default function() {
    this._reducers[models.ACTION.NOTIFICATION_CLEAR] = (state: models.IStateModel, action: models.IActionModel) => {
        state.notifications = [];
    };
}
