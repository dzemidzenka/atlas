import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';


const ROUTES: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild(),
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
