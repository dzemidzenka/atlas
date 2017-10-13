import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

import { SettingsComponent } from './settings.component';


const ROUTES: Routes = [
  { path: '', component: SettingsComponent }
];


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild(),
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
