import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, IMenuModel } from '@main/app.service';
import { map } from "rxjs/operators/map";
import { filter } from "rxjs/operators/filter";

@Component({
    selector: 'atlas-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    constructor(
        private _appService: AppService,
    ) { }


    state$ = this._appService.state$.pipe(
        filter(state => state.hasOwnProperty('menu')),
        map(state => ({
            view: state.view,
            menu: state.menu.filter(menu => menu.active)
        })));


    onNavigate(urlParams: Array<string>) {
        this._appService.actionMenu(urlParams);
    }

    onFavoriteToggle(item: IMenuModel) {
        this._appService.actionFavoriteToggle(item);
    }

    trackByItemId(index: number, item: IMenuModel): number {
        return item.id;
    }
}
