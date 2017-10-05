import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { TranslateModule } from '@ngx-translate/core';


const ROUTES: Routes = [
  { path: '', component: SettingsComponent }
];



@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild(),
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
