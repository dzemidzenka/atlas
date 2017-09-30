import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';


const ROUTES: Routes = [
  { path: '', component: OrderComponent }
];



@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
  ],
  declarations: [OrderComponent]
})
export class OrderModule { }
