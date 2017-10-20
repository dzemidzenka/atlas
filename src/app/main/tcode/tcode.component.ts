import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';

import { ReduxService } from '../../providers/redux.service';
import { Observable } from 'rxjs/Observable';
import { IMenuModel } from '../../shared/models';

@Component({
    selector: 'atlas-tcode',
    templateUrl: './tcode.component.html',
    styleUrls: ['./tcode.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TcodeComponent implements OnInit {
    constructor(private _reduxService: ReduxService) {}

    menuCtrl: FormControl;
    filteredMenu: Observable<Array<IMenuModel>>;
    @ViewChild(MatAutocompleteTrigger) trigger;

    state$ = this._reduxService.state$.map(state => state.country);


    ngOnInit() {
        this.menuCtrl = new FormControl();
        this.filteredMenu = this.menuCtrl.valueChanges
            .startWith(null);
            // .map(menu => (menu ? this.filterMenu(menu) : this._reduxService.getCurrentState().menu.filter(item => item.tcode)));
    }

    filterMenu(tcode: string) {
        return this._reduxService
            .getCurrentState()
            .menu.filter(item => item.hasOwnProperty('tcode'))
            .filter(item => item.tcode)
            .filter(item => item.tcode.toLowerCase().includes(tcode.toLowerCase()));
    }

    onSelect(tcode: string) {
        if (tcode.trim().length === 0) {
            return;
        }

        const urlParams: Array<string> = this._reduxService
            .getCurrentState()
            .menu.filter(menu => menu.isComponent)
            .filter(menu => menu.hasOwnProperty('tcode'))
            .filter(menu => menu.tcode.trim().toLowerCase() === tcode.toLowerCase())[0].urlParams;

        this._reduxService.actionMenu(urlParams);

        this.menuCtrl.setValue(null);
        this.trigger.closePanel();
    }
}
