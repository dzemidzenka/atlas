import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService, VIEW } from '../../../../providers/redux.service';

@Component({
    selector: 'atlas-app-list',
    templateUrl: './app-list.component.html',
    styleUrls: ['./app-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppListComponent {
    constructor(
        private _reduxService: ReduxService
    ) { }
    view = VIEW;

    switchApp(app: string) {
        if (Object.values(VIEW).includes(app)) {
            this._reduxService.actionDashboard(app as VIEW);
        } else {
            this._reduxService.actionMenu([app]);
        }
    }
}
