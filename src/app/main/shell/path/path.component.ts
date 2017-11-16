import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '@main/app.service';

@Component({
    selector: 'atlas-path',
    templateUrl: './path.component.html',
    styleUrls: ['./path.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathComponent {
    constructor(
        private _appService: AppService
    ) { }

    path$ = this._appService.state$.map(state =>
        Object.assign({
            urlParams: state.urlParams,
            isComponent: state.isComponent
        })
    );

    onClick(index: number) {
        const urlParams = this._appService.currentState.urlParams;
        this._appService.actionMenu(urlParams.slice(0, index + 1));
    }
}
