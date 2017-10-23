import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../../providers/redux.service';
import { COUNTRY } from '../../../../shared/models';

@Component({
    selector: 'atlas-country-selector',
    templateUrl: './country-selector.component.html',
    styleUrls: ['./country-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountrySelectorComponent {
    constructor(private _reduxService: ReduxService) {}

    menu = [];

    state$ = this._reduxService.state$
        .do(state => {
            let countries;
            if (state.hasOwnProperty('user') && state.user.hasOwnProperty('allowedCountries')) {
                countries = state.user.allowedCountries;
            }
            if (!countries) {
                countries = COUNTRY;
            }
            this.menu = Object.values(countries)
                .sort()
                .map(country =>
                    Object.assign({
                        title: country,
                        target: country,
                        translationPath: 'country.' + country,
                        iconClass: `flag-icon flag-icon-${country}`
                    })
                );
        })
        .map(state =>
            Object.assign({
                country: state.country,
                translationPath: 'country.' + state.country,
                isLoggedIn: state.isLoggedIn
            })
        );

    switchCountry(country: COUNTRY) {
        this._reduxService.actionCountry(country);
    }
}
