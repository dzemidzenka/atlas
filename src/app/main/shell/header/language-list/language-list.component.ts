import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService, LANGUAGE } from '../../../../providers/redux.service';

@Component({
    selector: 'atlas-language-list',
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageListComponent {
    constructor(
        private _reduxService: ReduxService
    ) { }

    languages = Object.values(LANGUAGE).sort();

    switchLanguage(language: LANGUAGE) {
        this._reduxService.actionLanguage(language);
    }
}
