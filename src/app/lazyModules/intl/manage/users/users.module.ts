import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersService } from './users.service';
import { UsersComponent } from './users.component';
import { UserChangeComponent } from './user-change/user-change.component';

const ROUTES: Routes = [
    {
        path: '',
        component: UsersComponent
    }
];

@NgModule({
    providers: [
        UsersService,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES),
        TranslateModule.forChild()
    ],
    declarations: [UsersComponent, UserChangeComponent],
})
export class UsersModule { }
