import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'atlas-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    constructor() {}
}
