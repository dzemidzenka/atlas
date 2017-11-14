import { Component, ChangeDetectionStrategy, Input, ComponentRef } from '@angular/core';

@Component({
    selector: 'atlas-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent {
    @Input() rightBorder = true;
    @Input() componentRef: ComponentRef<any>;
}
