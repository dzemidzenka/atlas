import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../main/app.translation.module';

import { SigninComponent } from './signin.component';


const ROUTES: Routes = [
  { path: '', component: SigninComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppTranslationModule,
  ],
  declarations: [SigninComponent]
})
export class SigninModule { }
