import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, VIEW } from '@main/app.service';
import { pluck } from 'rxjs/operators/pluck';

@Component({
    selector: 'atlas-app-list',
    templateUrl: './app-list.component.html',
    styleUrls: ['./app-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppListComponent {
    constructor(
        private _appService: AppService
    ) { }
    view = VIEW;
    apps$ = this._appService.state$.pipe(pluck('apps'));

    switchApp(app: string) {
        if (Object.values(VIEW).includes(app)) {
            this._appService.actionDashboard(app as VIEW);
        } else {
            this._appService.actionMenu([app]);
        }
    }
}
