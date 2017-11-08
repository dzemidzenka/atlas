import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ReduxService, ACTION } from '../../providers/redux.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'atlas-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
    constructor(
        private _reduxService: ReduxService
    ) {}

    @ViewChild('sidenav') private _sidenav: MatDrawer;

    state$ = this._reduxService.state$
        .map(state =>
            Object.assign({
                action: state.action,
                isLoggedIn: state.isLoggedIn,
                isComponent: state.isComponent
            })
        )
        .do(state => (state.action.type === ACTION.LOGOUT ? this._sidenav.close() : null));

    onSidebarToggle() {
        this._sidenav.toggle();
    }
}
