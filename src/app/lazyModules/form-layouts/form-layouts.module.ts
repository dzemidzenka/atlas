import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLayoutsComponent } from './form-layouts.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';


const ROUTES: Routes = [
  {
    path: '',
    component: FormLayoutsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    ThemeModule,
    TranslateModule.forChild(),
  ],
  declarations: [FormLayoutsComponent]
})
export class FormLayoutsModule { }
