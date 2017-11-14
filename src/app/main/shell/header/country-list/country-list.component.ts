import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, COUNTRY } from '../../../../main/app.service';

@Component({
    selector: 'atlas-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryListComponent {
    constructor(
        private _appService: AppService
    ) { }

    countries$ = this._appService.state$.map(state => {
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
        this._appService.actionCountry(country);
    }
}
