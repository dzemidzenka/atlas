import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '@main/app.service';
import { CountryListComponent } from '../country-list/country-list.component';

@Component({
    selector: 'atlas-country-selector',
    templateUrl: './country-selector.component.html',
    styleUrls: ['./country-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountrySelectorComponent {
    constructor(
        private _appService: AppService
    ) {}

    country$ = this._appService.state$.map(state => state.country);
    componentRef = CountryListComponent;
}
