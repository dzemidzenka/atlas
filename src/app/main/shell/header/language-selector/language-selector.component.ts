import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../../providers/redux.service';
import { LANGUAGE, ACTION } from '../../../../shared/models';

@Component({
    selector: 'atlas-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent {
    constructor(private _reduxService: ReduxService) {}

    state$ = this._reduxService.state$
    // .filter(state => state.action.hasOwnProperty('op') && state.action.op === ACTION.ROUTE)
    .map(state =>
        Object.assign({
            language: state.language,
            translationPath: 'language.' + state.language,
            isLoggedIn: state.isLoggedIn
        })
    );

    menu = Object.values(LANGUAGE)
        .sort()
        .map(language =>
            Object.assign({
                title: language,
                target: language,
                translationPath: 'language.' + language
            })
        );

    switchLanguage(language: LANGUAGE) {
        this._reduxService.actionLanguage(language);
    }
}
