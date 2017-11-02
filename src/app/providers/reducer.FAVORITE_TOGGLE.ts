import * as models from '../shared/models';

export default function() {
    this._reducers[models.ACTION.FAVORITE_TOGGLE] = (state: models.IStateModel, action: models.IActionModel) => {
        state.menu.filter(menu => menu.id === action.menuItem.id).map(menu => (menu.isFavorite = !menu.isFavorite));
        this._getActiveMenu(state);
    };
}
