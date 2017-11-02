import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';

import { UsersComponent } from './users.component';

const ROUTES: Routes = [
    {
        path: '',
        component: UsersComponent
    }
];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ROUTES), TranslateModule.forChild()],
    declarations: [UsersComponent]
})
export class UsersModule {}
