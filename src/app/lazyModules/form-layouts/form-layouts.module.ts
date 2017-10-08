import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLayoutsComponent } from './form-layouts.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';


const ROUTES: Routes = [
  {
    path: '',
    component: FormLayoutsComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    ThemeModule,
    TranslateModule.forChild(),
  ],
  declarations: [FormLayoutsComponent]
})
export class FormLayoutsModule { }
