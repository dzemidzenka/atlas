import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ReduxService } from '../../providers/redux.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'atlas-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
    constructor(private _reduxService: ReduxService) {}

    @ViewChild('sidenav') sidenav: MatDrawer;

    state$ = this._reduxService.state$.map(state =>
        Object.assign({
            country: state.country,
            isLoggedIn: state.isLoggedIn,
            isComponent: state.isComponent,
            user: state.user,
            notifications: state.notifications
        })
    );

    onSidebarToggle() {
        this.sidenav.toggle();
    }
}
