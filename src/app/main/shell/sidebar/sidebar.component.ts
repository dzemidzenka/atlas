import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, IMenu, LANGUAGE, COUNTRY } from '@main/app.service';

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

    state$ = this._appService.state$;

    onMenuClick(menu: IMenu) {
        if (menu.children.length === 0) {
            this._appService.actionMenu(menu.urlParams, menu.children.length === 0);
        }
    }

    switchApp(app: string) {
        this._appService.actionMenu([app], false);
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

    trackById(index: number, item: IMenu): number {
        return item.id;
    }
}
