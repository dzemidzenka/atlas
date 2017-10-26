import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../../providers/redux.service';
import { COUNTRY } from '../../../../shared/models';

@Component({
    selector: 'atlas-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryListComponent {
    constructor(private _reduxService: ReduxService) {}

    countries$ = this._reduxService.state$.map(state => {
        let countries;
        if (state.hasOwnProperty('user') && state.user.hasOwnProperty('allowedCountries')) {
            countries = state.user.allowedCountries;
        }
        if (!countries) {
            countries = COUNTRY;
        }
        return Object.values(countries).sort();
    });

    switchCountry(country: COUNTRY) {
        this._reduxService.actionCountry(country);
    }
}
