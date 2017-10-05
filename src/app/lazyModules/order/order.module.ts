import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { TranslateModule } from '@ngx-translate/core';


const ROUTES: Routes = [
  {
    path: '',
    component: OrderComponent,
  }
];



@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild(),
  ],
  declarations: [OrderComponent],

})
export class OrderModule { }
