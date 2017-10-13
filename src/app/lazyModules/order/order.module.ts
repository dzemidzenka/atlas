import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

import { OrderComponent } from './order.component';


const ROUTES: Routes = [
  {
    path: '',
    component: OrderComponent,
  }
];


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild(),
  ],
  declarations: [OrderComponent],

})
export class OrderModule { }
