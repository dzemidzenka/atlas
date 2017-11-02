import * as models from '../shared/models';
import isEmpty from 'lodash-es/isEmpty';
import omit from 'lodash-es/omit';

export default function() {
    this._reducers[models.ACTION.INIT] = (state: models.IStateModel, action: models.IActionModel) => {
        if (!isEmpty(action.user)) {
            state.user = action.user;
            state.isLoggedIn = true;

            const url = window.location.pathname + window.location.search;
            const urlTree = this._router.parseUrl(url);
            const urlParams = url
                .split('/')
                .filter(param => param !== '')
                .map(param => param.split('?')[0]);
            const queryParams = omit(urlTree.queryParams, 'returnUrl');
            const returnUrl = urlTree.queryParams['returnUrl'];

            state.language = (queryParams['language'] ? queryParams['language'] : state.user.languageDefault) as models.LANGUAGE;
            state.country = (queryParams['country'] ? queryParams['country'] : state.user.countryDefault) as models.COUNTRY;
            state.view = queryParams['view'] as models.VIEW;

            let returnUrlParams;
            if (returnUrl) {
                returnUrlParams = returnUrl
                    .split('/')
                    .filter(param => param !== '')
                    .map(param => param.split('?')[0]);
            }
            this._router.navigate(returnUrl ? [returnUrlParams.join('/')] : [urlParams.join('/')], { queryParams: { ...queryParams } });
        }
    };
}
