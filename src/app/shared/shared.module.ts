import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RxJs operators
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/auditTime';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';



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
    MatProgressSpinnerModule,
    // MatRadioModule,
    // MatSelectModule,
    MatSidenavModule,
    // MatSnackBarModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatToolbarModule,
    MatTooltipModule
} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';

import { IFrameComponent } from './components/iframe/iframe.component';

const MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,

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
    MatProgressSpinnerModule,
    // MatRadioModule,
    // MatSelectModule,
    MatSidenavModule,
    // MatSnackBarModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatToolbarModule,
    MatTooltipModule
];

const COMPONENTS = [IFrameComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS]
})
export class SharedModule {}
