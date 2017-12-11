import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/forkJoin';

import { LoadingService } from './providers/loading.service';
import { LocalStorageService } from './providers/local-storage.service';
import { NotificationService } from './providers/notification.service';
import { ReLoginService } from './providers/re-login.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatTabsModule } from '@angular/material/tabs';
import { OverlayModule } from '@angular/cdk/overlay';

import { IFrameComponent } from './components/iframe/iframe.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

const MODULES = [
    CommonModule,
    ReactiveFormsModule,
    OverlayModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    // MatTabsModule,
    MatTooltipModule
];

const COMPONENTS =
    [
        IFrameComponent,
        SpinnerComponent
    ];



@NgModule({
    declarations: [...COMPONENTS],
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                LoadingService,
                LocalStorageService,
                NotificationService,
                ReLoginService,
            ]
        };
    }
}
