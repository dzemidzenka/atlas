import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

import { Demo1Component } from './demo1.component';


const ROUTES: Routes = [
  {
    path: '',
    component: Demo1Component,
  }
];



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild(),
  ],
  declarations: [Demo1Component],

})
export class Demo1Module { }
