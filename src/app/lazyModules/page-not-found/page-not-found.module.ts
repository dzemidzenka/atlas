import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

import { PageNotFoundComponent } from './page-not-found.component';


const ROUTES: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
  },
];


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild(),
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
