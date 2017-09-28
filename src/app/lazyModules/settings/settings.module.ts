import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';


const ROUTES: Routes = [
  { path: '', component: SettingsComponent }
];



@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
