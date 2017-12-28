import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService, IMenu } from '@main/app.service';
// import { map, startWith, distinctUntilChanged, withLatestFrom } from "rxjs/operators";
import { map } from "rxjs/operators/map";
import { startWith } from "rxjs/operators/startWith";
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";
import { withLatestFrom } from "rxjs/operators/withLatestFrom";


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

    filteredMenu = this.menuCtrl.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged(),
        withLatestFrom(this._appService.state$),
        map(array => (array[0] ? this.matchTcode(array[0], array[1].menu) : array[1].menu.filter(item => item.tcode))));




    matchTcode(tcode: string, menu: IMenu[]): IMenu[] {
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
