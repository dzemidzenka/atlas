import * as models from '../shared/models';
import omit from 'lodash-es/omit';

export default function() {
    this._reducers[models.ACTION.LOGIN] = (state: models.IStateModel, action: models.IActionModel) => {
        state.user = action.user;
        state.isLoggedIn = true;
        if (action.rememberMe) {
            localStorage.setItem(this._lsAuth, JSON.stringify(state.user));
        }
        this._notificationsService.remove();

        const queryParams = omit(this._route.snapshot.queryParams, 'returnUrl');
        const returnUrl = this._route.snapshot.queryParams['returnUrl'];

        state.language = queryParams['language'] ? queryParams['language'] : state.user.languageDefault;
        state.country = queryParams['country'] ? queryParams['country'] : state.user.countryDefault;
        state.view = queryParams['view'];

        let returnUrlParams;
        if (returnUrl) {
            const menuItem = state.menu.find(menu => menu.routerPath === returnUrl);
            if (menuItem) {
                state.isComponent = menuItem.isComponent; // to prevent screen blinking due to the delay of lazy loading network request
            }
            returnUrlParams = returnUrl
                .split('/')
                .filter(param => param !== '')
                .map(param => param.split('?')[0]);
        }
        this._router.navigate(returnUrl ? [returnUrlParams.join('/')] : [state.url.split('?')[0]], { queryParams: { ...queryParams } });
    };
}
