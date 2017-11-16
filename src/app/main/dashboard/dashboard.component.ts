import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, IMenuModel } from '@main/app.service';

@Component({
    selector: 'atlas-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    constructor(
        private _appService: AppService
    ) { }

    state$ = this._appService.state$.filter(state => state.hasOwnProperty('menu')).map(state =>
        Object.assign({
            view: state.view,
            menu: state.menu.filter(menu => menu.active)
        })
    );

    onNavigate(urlParams: Array<string>) {
        this._appService.actionMenu(urlParams);
    }

    onFavoriteToggle(item: IMenuModel) {
        this._appService.actionFavoriteToggle(item);
    }

    trackByItemId(index: number, item: IMenuModel) {
        return item.id;
    }
}
