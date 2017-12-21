import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, IStateModel, IMenuModel, LANGUAGE, COUNTRY } from '@main/app.service';
import { map } from 'rxjs/operators/map';

@Component({
    selector: 'atlas-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    constructor(
        private _appService: AppService
    ) { }

    expanded = false;
    id = 2;

    state$ = this._appService.state$;
    menu$ = this.state$.pipe(
        map((state: IStateModel) => state.menu.filter(menu => menu.urlParams[0] === state.app)),
        map((menu: Array<IMenuModel>) => menu.filter(menu => menu.urlParams.length === 2))
    );

    onMenuClick(menu: IMenuModel) {
        this.id = 2;
        this._appService.actionMenu(menu.urlParams, menu.children.length === 0);
    }

    setId(id: number) {
        this.id = id;
    }

    switchApp(app: string) {
        this._appService.actionMenu([app]);
    }

    switchLanguage(language: LANGUAGE) {
        this._appService.actionLanguage(language);
    }

    switchCountry(country: COUNTRY) {
        this._appService.actionCountry(country);
    }

    logOut() {
        this._appService.actionLogOut();
    }

}
