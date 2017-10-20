import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../providers/redux.service';
import { LANGUAGE } from '../../../shared/models';

@Component({
  selector: 'atlas-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageComponent {
  constructor(
    private _reduxService: ReduxService,
  ) { }


  state$ = this._reduxService.state$
    .map(state => Object.assign({
      language: state.language,
      translationPath: 'language.' + state.language,
      isLoggedIn: state.isLoggedIn
    }));


  menu = Object.values(LANGUAGE)
    .sort()
    .map(language => Object.assign(
      {
        title: language,
        target: language,
        translationPath: 'language.' + language
      }
    ));


  switchLanguage(language: LANGUAGE) {
    this._reduxService.actionLanguage(language);
  }
}
