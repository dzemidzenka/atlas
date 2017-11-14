import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
    selector: 'atlas-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
    componentRef = UserMenuComponent;
    @Input() name: string;
    @Input() picture: string;
}
