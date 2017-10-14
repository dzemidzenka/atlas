import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../providers/redux.service';
import { COUNTRY } from '../../../models/models';

@Component({
  selector: 'atlas-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryComponent {
  constructor(
    private _reduxService: ReduxService,
  ) { }

  state$ = this._reduxService.state$.map(state => Object.assign({
    country: state.country,
    translationPath: 'country.' + state.country,
    isLoggedIn: state.isLoggedIn
  }));


  menu = Object.values(COUNTRY)
    .sort()
    .map(country => Object.assign(
      {
        title: country,
        target: country,
        translationPath: 'country.' + country,
        iconClass: `flag-icon flag-icon-${country}`
      }
    ));


  switchCountry(country: COUNTRY) {
    this._reduxService.actionCountry(country);
  }
}
