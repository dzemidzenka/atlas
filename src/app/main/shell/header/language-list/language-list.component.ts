import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, LANGUAGE } from '../../../../main/app.service';

@Component({
    selector: 'atlas-language-list',
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageListComponent {
    constructor(
        private _appService: AppService
    ) { }

    languages = Object.values(LANGUAGE).sort();

    switchLanguage(language: LANGUAGE) {
        this._appService.actionLanguage(language);
    }
}
