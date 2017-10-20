import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../providers/redux.service';

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
        this._reduxService.actionMenu([app]);
    }
}
