import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '@main/app.service';
import { map } from "rxjs/operators/map";

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

    isLoggedIn$ = this._appService.state$.pipe(map(state => state.isLoggedIn));
}
