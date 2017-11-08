import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';
import { ReduxService, IMenuModel } from '../../../providers/redux.service';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'atlas-tcode',
    templateUrl: './tcode.component.html',
    styleUrls: ['./tcode.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TcodeComponent {
    constructor(
        private _reduxService: ReduxService
    ) { }

    menuCtrl = new FormControl();

    filteredMenu = this.menuCtrl.valueChanges
        .startWith(null)
        .debounceTime(environment.debounceTime)
        .distinctUntilChanged()
        .withLatestFrom(this._reduxService.state$)
        .map(array => (array[0] ? this.matchTcode(array[0], array[1].menu) : array[1].menu.filter(item => item.tcode)));

    // @ViewChild(MatAutocompleteTrigger) private _trigger;



    matchTcode(tcode: string, menu: Array<IMenuModel>): Array<IMenuModel> {
        return menu
            .filter(item => item.hasOwnProperty('tcode'))
            .filter(item => item.tcode)
            .filter(item => item.tcode.toLowerCase().includes(tcode.toLowerCase()));
    }

    onSelect(tcode: string) {
        this._reduxService.actionTcode(tcode);
        this.menuCtrl.setValue(null);
        // this._trigger.closePanel();
    }
}
