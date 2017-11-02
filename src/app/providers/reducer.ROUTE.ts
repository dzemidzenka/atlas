import * as models from '../shared/models';
import * as constants from '../shared/constants';

export default function() {
    this._reducers[models.ACTION.ROUTE] = (state: models.IStateModel, action: models.IActionModel) => {
        state.url = action.url;
        state.urlParams = action.urlParams.filter(param => param.length > 0).map(param => param.toLowerCase());
        state.queryParams = action.queryParams;

        if (state.queryParams['language']) {
            state.language = state.queryParams['language'];
        } else {
            state.language = models.LANGUAGE.EN;
        }
        this._translate.use(state.language);

        if (state.queryParams['country']) {
            state.country = state.queryParams['country'];
        } else {
            state.country = models.COUNTRY.US;
        }

        if (state.queryParams['view']) {
            state.view = state.queryParams['view'];
        }
        if (!state.menuRecent) {
            state.menuRecent = [];
        }

        const _urlParams = [...state.urlParams];
        const _routerPath = _urlParams.join('/');
        if (state.menu) {
            state.menuItemCurrent = state.menu.find(item => item.routerPath === _routerPath);
        }
        state.isComponent = false;
        if (state.menuItemCurrent) {
            state.isComponent = state.menuItemCurrent.isComponent;
        }

        // add component to recent
        if (state.isComponent) {
            if (!state.menuRecent.some(recent => recent.id === state.menuItemCurrent.id)) {
                state.menuRecent.unshift(state.menuItemCurrent);
                state.menuRecent = state.menuRecent.slice(0, constants.MAX_OF_RECENT - 1);
            }
        }
        this._getActiveMenu(state);
    };
}
