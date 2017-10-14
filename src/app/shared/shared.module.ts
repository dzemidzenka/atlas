import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// RxJs operators
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';



import {
  MatAutocompleteModule,
  MatButtonModule,
  // MatButtonToggleModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,
  // MatDatepickerModule,
  // MatDialogModule,
  // MatExpansionModule,
  // MatFormFieldModule,
  MatIconModule,
  // MatInputModule,
  // MatListModule,
  MatMenuModule,
  // MatProgressBarModule,
  // MatRadioModule,
  // MatSelectModule,
  MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
// import { MegaMenuModule } from 'primeng/primeng';





const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  // MegaMenuModule,

  MatAutocompleteModule,
  MatButtonModule,
  // MatButtonToggleModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,
  // MatDatepickerModule,
  // MatDialogModule,
  // MatExpansionModule,
  // MatFormFieldModule,
  MatIconModule,
  // MatInputModule,
  // MatListModule,
  MatMenuModule,
  // MatProgressBarModule,
  // MatRadioModule,
  // MatSelectModule,
  MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatToolbarModule,
  MatTooltipModule,
];


const COMPONENTS = [
];


@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class SharedModule { }
