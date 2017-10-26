import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../../providers/redux.service';
import { LanguageListComponent } from '../language-list/language-list.component';

@Component({
    selector: 'atlas-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent {
    constructor(private _reduxService: ReduxService) {}
    componentRef = LanguageListComponent;

    state$ = this._reduxService.state$.map(state =>
        Object.assign({
            language: state.language,
            isLoggedIn: state.isLoggedIn
        })
    );
}
