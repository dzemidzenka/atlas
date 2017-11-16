import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from './home.component';

const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ROUTES), TranslateModule.forChild()],
    declarations: [HomeComponent]
})
export class HomeModule {}
