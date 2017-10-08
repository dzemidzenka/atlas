import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatAutocompleteModule,  //
  MatButtonModule,  //
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,  //
  MatIconModule,   //
  MatInputModule,
  MatListModule,
  MatMenuModule,  //
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatToolbarModule,   //
  MatTooltipModule,
} from '@angular/material';
import { NotificationCountComponent } from './notification/notification.component';


const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  MatAutocompleteModule,  //
  MatButtonModule,  //
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,  //
  MatIconModule,   //
  MatInputModule,
  MatListModule,
  MatMenuModule,  //
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatToolbarModule,   //
  MatTooltipModule,
];




@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, NotificationCountComponent],
  declarations: [NotificationCountComponent]
})
export class SharedModule { }
