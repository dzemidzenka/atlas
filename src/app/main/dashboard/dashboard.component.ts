import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../providers/redux.service';
import { IMenuModel } from '../../shared/models';

@Component({
    selector: 'atlas-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    constructor(private _reduxService: ReduxService) {}

    state$ = this._reduxService.state$.filter(state => state.hasOwnProperty('menu')).map(state =>
        Object.assign({
            view: state.view,
            menu: state.menu.filter(menu => menu.active)
        })
    );

    onNavigate(urlParams: Array<string>) {
        this._reduxService.actionMenu(urlParams);
    }

    onFavoriteToggle(item: IMenuModel) {
        this._reduxService.actionFavoriteToggle(item);
    }

    trackByItemId(index, item: IMenuModel) {
        return item.id;
    }
}
