import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { NotAuthorizedComponent } from './not-authorized.component';


const ROUTES: Routes = [
        {
                path: '',
                component: NotAuthorizedComponent,
        },
];


@NgModule({
        imports: [
                SharedModule,
                RouterModule.forChild(ROUTES),
                TranslateModule.forChild(),
        ],
        declarations: [NotAuthorizedComponent]
})
export class NotAuthorizedModule { }