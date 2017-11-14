import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService, IMenuModel } from '../../../main/app.service';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'atlas-tcode',
    templateUrl: './tcode.component.html',
    styleUrls: ['./tcode.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TcodeComponent {
    constructor(
        private _appService: AppService
    ) { }

    menuCtrl = new FormControl();

    filteredMenu = this.menuCtrl.valueChanges
        .startWith(null)
        .debounceTime(environment.debounceTime)
        .distinctUntilChanged()
        .withLatestFrom(this._appService.state$)
        .map(array => (array[0] ? this.matchTcode(array[0], array[1].menu) : array[1].menu.filter(item => item.tcode)));




    matchTcode(tcode: string, menu: Array<IMenuModel>): Array<IMenuModel> {
        return menu
            .filter(item => item.hasOwnProperty('tcode'))
            .filter(item => item.tcode)
            .filter(item => item.tcode.toLowerCase().includes(tcode.toLowerCase()));
    }

    onSelect(tcode: string) {
        this._appService.actionTcode(tcode);
        this.menuCtrl.setValue(null);
        // this._trigger.closePanel();
    }
}
