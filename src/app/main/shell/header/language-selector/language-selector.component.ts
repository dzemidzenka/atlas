import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../../../../main/app.service';
import { LanguageListComponent } from '../language-list/language-list.component';

@Component({
    selector: 'atlas-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent {
    constructor(
        private _appService: AppService
    ) { }
    componentRef = LanguageListComponent;

    state$ = this._appService.state$.map(state =>
        Object.assign({
            language: state.language,
            isLoggedIn: state.isLoggedIn
        })
    );
}
