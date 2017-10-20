import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { IFrameComponent } from './iframe.component';


const ROUTES: Routes = [
  {
    path: '',
    component: IFrameComponent,
  }
];



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [IFrameComponent],

})
export class IFrameModule { }
