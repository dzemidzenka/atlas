import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AppService, ACTION } from '@main/app.service';
import { MatDrawer } from '@angular/material/sidenav';
import { tap } from "rxjs/operators/tap";

@Component({
    selector: 'atlas-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
    constructor(
        private _appService: AppService,
    ) { }

    @ViewChild('sidenav') private _sidenav: MatDrawer;

    state$ = this._appService.state$.pipe(
        tap(state => (state.action.type === ACTION.LOGOUT ? this._sidenav.close() : null)));

    onSidebarToggle() {
        this._sidenav.toggle();
    }
}
