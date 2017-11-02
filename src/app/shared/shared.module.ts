import { NgModule, ModuleWithProviders } from '@angular/core';
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
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/shareReplay';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';

import { ReduxService } from '../providers/redux.service';
import { LoadingService } from '../providers/loading.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
// import {
//     MatAutocompleteModule,
//     MatButtonModule,
//     // MatButtonToggleModule,
//     // MatCardModule,
//     MatCheckboxModule,
//     // MatChipsModule,
//     // MatDatepickerModule,
//     // MatDialogModule,
//     // MatExpansionModule,
//     // MatFormFieldModule,
//     // MatIconModule,
//     // MatInputModule,
//     // MatListModule,
//     // MatMenuModule,
//     MatProgressBarModule,
//     MatProgressSpinnerModule,
//     // MatRadioModule,
//     // MatSelectModule,
//     MatSidenavModule,
//     // MatSnackBarModule,
//     // MatSliderModule,
//     // MatSlideToggleModule,
//     // MatToolbarModule,
//     MatTooltipModule
// } from '@angular/material';

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
    MatCheckboxModule,
    // MatChipsModule,
    // MatDatepickerModule,
    // MatDialogModule,
    MatExpansionModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    // MatRadioModule,
    // MatSelectModule,
    MatSidenavModule,
    // MatSnackBarModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatToolbarModule,
    MatTabsModule,
    MatTooltipModule
];

const COMPONENTS = [IFrameComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ReduxService, LoadingService]
        };
    }
}
