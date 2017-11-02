import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ReduxService } from '../../../providers/redux.service';
import { IMenuModel } from '../../../shared/models';

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
    // @ViewChild(MatAutocompleteTrigger) private _trigger;

    ngOnInit() {
        this.menuCtrl = new FormControl();
        this.filteredMenu = this.menuCtrl.valueChanges
            .startWith(null)
            .debounceTime(250)
            .distinctUntilChanged()
            .withLatestFrom(this._reduxService.state$)
            .map(array => (array[0] ? this.matchTcode(array[0], array[1].menu) : array[1].menu.filter(item => item.tcode)));
    }

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
