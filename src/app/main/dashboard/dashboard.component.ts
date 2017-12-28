import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, IMenu } from '@main/app.service';
import { map } from "rxjs/operators/map";

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
        map(state => ({
            view: state.view,
            menu: state.menu.filter(menu => menu.active)
        })));


    onNavigate(urlParams: string[]) {
        this._appService.actionMenu(urlParams);
    }

    onFavoriteToggle(item: IMenu) {
        this._appService.actionFavoriteToggle(item);
    }

    trackByItemId(index: number, item: IMenu): number {
        return item.id;
    }
}
