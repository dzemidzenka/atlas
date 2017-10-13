import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../providers/redux.service';
import { ACTION, COUNTRY, LANGUAGE } from '../../models/models';
import { MENU_ITEMS } from './menu';

@Component({
  selector: 'atlas-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  constructor(
    private _reduxService: ReduxService,
  ) { }

  menu = MENU_ITEMS;
  COUNTRY = Object.values(COUNTRY);
  LANGUAGE = Object.values(LANGUAGE);
  private _LANGUAGE = Object.keys(LANGUAGE);

  state$ = this._reduxService.state$.map(state => Object.assign({
    country: state.country,
    language: state.language,
    isLoggedIn: state.isLoggedIn,
  }));



  switchCountry(country: string) {
    this._reduxService.actionCountry(country as COUNTRY);
  }


  switchLanguage(language: string) {
    this._reduxService.actionLanguage(language as LANGUAGE);
  }
}
