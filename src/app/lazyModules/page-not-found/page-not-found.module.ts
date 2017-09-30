import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';


const ROUTES: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
