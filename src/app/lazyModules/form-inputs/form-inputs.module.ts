import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInputsComponent } from './form-inputs.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';


const ROUTES: Routes = [
  {
    path: '',
    component: FormInputsComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    ThemeModule,
    TranslateModule.forChild(),
  ],
  declarations: [FormInputsComponent]
})
export class FormInputsModule { }
