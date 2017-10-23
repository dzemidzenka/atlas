import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../../providers/redux.service';
import { VIEW } from '../../../../shared/models';

@Component({
    selector: 'atlas-apps-selector',
    templateUrl: './apps-selector.component.html',
    styleUrls: ['./apps-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppsSelectorComponent {
    constructor(private _reduxService: ReduxService) {}

    state$ = this._reduxService.state$.map(state =>
        Object.assign({
            isLoggedIn: state.isLoggedIn
        })
    );

    menu = [
        {
            title: 'Favorites',
            target: VIEW.FAVORITE,
            view: true
        },
        {
            title: 'Recent',
            target: VIEW.RECENT,
            view: true
        },
        {
            title: 'INTL',
            target: 'intl'
        },
        {
            title: 'Domestic',
            target: 'domestic'
        },
        {
            title: 'CRM',
            target: 'crm'
        },
        {
            title: 'SAP',
            target: 'sap'
        }
    ];

    switchApp(app: string) {
        if (Object.values(VIEW).includes(app)) {
            this._reduxService.actionDashboard(app as VIEW);
        } else {
            this._reduxService.actionMenu([app]);
        }
    }
}
