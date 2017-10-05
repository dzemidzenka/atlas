import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// RxJs operators
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

// providers
import * as tokens from '../providers/tokens';
import { ReduxService } from '../providers/redux.service';
import { AuthService } from '../providers/auth.service';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';

// routes
import { ROUTES } from '../routes/app.routes';

// components (non-lazy)
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TcodeComponent } from './tcode/tcode.component';
import { PathComponent } from './path/path.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StickynotesComponent } from './dashboard/stickynotes/stickynotes.component';
import { TilesComponent } from './dashboard/tiles/tiles.component';
import { LoginComponent } from './login/login.component';


import { CovalentNotificationsModule } from '@covalent/core';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdFormFieldModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  MdStepperModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ThemeModule } from '../@theme/theme.module';


//  INJECTION TOKENS
const TOKEN_PROVIDERS = [
  {
    provide: tokens.LOCAL_STORAGE_NAME_PROVIDER,
    useValue: 'atlas_state'
  }
];



// translation
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}










@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TcodeComponent,
    PathComponent,
    DashboardComponent,
    StickynotesComponent,
    TilesComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    ThemeModule.forRoot(),

    BrowserAnimationsModule,
    CovalentNotificationsModule,


    MdAutocompleteModule,  //
    MdButtonModule,  //

    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,

    MdFormFieldModule,  //

    MdGridListModule,
    MdIconModule,   //

    MdInputModule,
    MdListModule,

    MdMenuModule,  //

    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,

    MdToolbarModule,   //

    MdTooltipModule,
    MdStepperModule,
  ],
  exports: [
    CommonModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ...TOKEN_PROVIDERS,
    ReduxService,
    AuthService,
    RouteGuardService,
    RouteResolverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
