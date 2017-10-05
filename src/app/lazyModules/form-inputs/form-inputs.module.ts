import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInputsComponent } from './form-inputs.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';


const ROUTES: Routes = [
  {
    path: '',
    component: FormInputsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    ThemeModule,
    TranslateModule.forChild(),
  ],
  declarations: [FormInputsComponent]
})
export class FormInputsModule { }
