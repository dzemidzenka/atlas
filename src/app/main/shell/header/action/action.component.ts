import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'atlas-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent {
    constructor() {}

    @Input() rightBorder = true;
    @Input() componentRef;
}
