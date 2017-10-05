import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ReduxService } from '../../providers/redux.service';
import { ACTION, COUNTRY, LANGUAGE } from '../../models/models';


@Component({
  selector: 'atlas-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathComponent {

  path$ = this._reduxService.state$
    .filter(state => state.action.op === ACTION.ROUTE || state.action.op === ACTION.LANGUAGE)
    .map(state => Object.assign({
      'urlParams': state.urlParams,
      'isComponent': state.isComponent,
      'country': state.country,
      'language': state.language
    }));

  COUNTRY = Object.values(COUNTRY);
  LANGUAGE = Object.values(LANGUAGE);
  private _LANGUAGE = Object.keys(LANGUAGE);


  constructor(
    private _router: Router,
    private _reduxService: ReduxService,
  ) { }


  onClick(event: string, index: number) {
    const urlParams = this._reduxService.getCurrentState().urlParams.slice(0, index);
    this._router.navigate([urlParams.join('/')]);
  }


  switchCountry(country: string) {
    const params = [...this._reduxService.getCurrentState().urlParams];
    params[0] = country;
    this._router.navigate([params.join('/')]);
  }


  switchLanguage(language: string) {
    this._reduxService.actionLanguage(language as LANGUAGE);
  }
}
