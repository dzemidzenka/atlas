import { Component } from '@angular/core';
import { ReduxService } from '../../providers/redux.service';

@Component({
    selector: 'atlas-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    constructor(private _reduxService: ReduxService) {}

    onClick() {
        this._reduxService.actionNotify([{ message: 'New notification ' + Date.now() }]);
    }
}
