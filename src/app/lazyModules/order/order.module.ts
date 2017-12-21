import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderService } from './order.service';
import { TreeTableModule } from 'primeng/primeng';
import { FormsModule }    from '@angular/forms';

const ROUTES: Routes = [
  {
    path: '',
    component: OrderComponent,
  }
];


@NgModule({
  providers: [
    OrderService,
  ],
  imports: [
    SharedModule,
    TreeTableModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild(),
  ],
  declarations: [OrderComponent],
})
export class OrderModule { }
