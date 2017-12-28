import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { NotFoundComponent } from './not-found.component';


const ROUTES: Routes = [
        {
                path: '',
                component: NotFoundComponent,
        },
];


@NgModule({
        imports: [
                SharedModule,
                RouterModule.forChild(ROUTES),
                TranslateModule.forChild(),
        ],
        declarations: [NotFoundComponent]
})
export class NotFoundModule { }