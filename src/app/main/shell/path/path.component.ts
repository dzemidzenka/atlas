import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../providers/redux.service';

@Component({
    selector: 'atlas-path',
    templateUrl: './path.component.html',
    styleUrls: ['./path.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathComponent {
    constructor(private _reduxService: ReduxService) {}

    path$ = this._reduxService.state$.map(state =>
        Object.assign({
            urlParams: state.urlParams,
            isComponent: state.isComponent
        })
    );

    onClick(event: string, index: number) {
        const urlParams = this._reduxService.getCurrentState().urlParams;
        this._reduxService.actionMenu(urlParams.slice(0, index + 1));
    }
}
