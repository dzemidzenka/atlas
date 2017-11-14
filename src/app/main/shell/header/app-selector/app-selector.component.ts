import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppListComponent } from '../app-list/app-list.component';

@Component({
    selector: 'atlas-app-selector',
    templateUrl: './app-selector.component.html',
    styleUrls: ['./app-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSelectorComponent {
    componentRef = AppListComponent;
}
