import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../../providers/redux.service';
import { CountryListComponent } from '../country-list/country-list.component';

@Component({
    selector: 'atlas-country-selector',
    templateUrl: './country-selector.component.html',
    styleUrls: ['./country-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountrySelectorComponent {
    constructor(private _reduxService: ReduxService) {}

    country$ = this._reduxService.state$.map(state => state.country);
    componentRef = CountryListComponent;
}
