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

    path$ = this._appService.state$;

    onClick(urlParams: Array<string>, index: number) {
        this._appService.actionMenu(urlParams.slice(0, index + 1));
    }
}
