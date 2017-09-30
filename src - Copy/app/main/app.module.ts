import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// RxJs operators
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

import { COUNTRY, IMenuModel } from '../models/models';
import sortBy from 'lodash-es/sortBy';

// providers
import * as tokens from '../providers/tokens';
import { ReduxService } from '../providers/redux.service';
import { AuthService } from '../providers/auth.service';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';
import { TranslateService } from '@ngx-translate/core';

// routes
import { ROUTES } from './app.routes';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
// import { DashboardModule } from '../lazyModules/dashboard/dashboard.module';



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




//  INJECTION TOKENS
const TOKEN_PROVIDERS = [
  {
    provide: tokens.LOCAL_STORAGE_NAME_PROVIDER,
    useValue: 'atlas_state'
  }
];


// (function () {
//   _routes = sortBy(ROUTES
//     .filter(route => route.hasOwnProperty('data'))
//     .filter(route => route.data.hasOwnProperty('active'))
//     .filter(route => route.data.active === true)
//     .filter(route => route.hasOwnProperty('canActivate'))
//     .filter(route => route.hasOwnProperty('resolve')),
//     // .map(addPropertiesToRoute),
//     // .reduce(generateAdditionalRoutes, ROUTES),
//     'path');
// })();

let _routes: Routes = [];
(function () {
  const __routes = ROUTES
    .filter(route => route.hasOwnProperty('data'))
    .filter(route => route.data.hasOwnProperty('active'))
    .filter(route => route.data.active === true)
    .filter(route => route.hasOwnProperty('canActivate'))
    .filter(route => route.hasOwnProperty('resolve'))
    .map(addPropertiesToRoute);
  generateAdditionalRoutes(__routes);
  _routes = sortBy(__routes, 'path');
})();
console.log('ROUTES', _routes);




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
  ],
  imports: [
    RouterModule.forRoot(_routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    // DashboardModule,

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
    TranslateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





// ***********************************************************************
// UTILITY FUNCTIONS
// ***********************************************************************


// adds/populates important properties on each route
function addPropertiesToRoute(route) {
  if (!route.data.hasOwnProperty('allowedCountries') || route.data.length === 0) {
    route.data.allowedCountries = Object.keys(COUNTRY).map(key => COUNTRY[key]);
  }
  route.data.allowedCountries.sort();
  route.data.isComponent = true;
  return route;
}

// splits ROUTE into several menu items, for example:
// route ':country/settings/admin' is split into SETTINGS (folder) && ADMIN (item)
// route ':country/settings/admin/app1' is split into SETTINGS (folder) && ADMIN (folder) && APP1 (item)
// function generateAdditionalRoutes(menu, route, i, routes) {
function generateAdditionalRoutes(routes) {

  const countries = Object.keys(COUNTRY).map(country => country.toLowerCase());

  const additionalRoutes = [
    {
      path: '',
      loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
      canActivate: [RouteGuardService],
      resolve: { RouteResolverService }
    },
    //  :country is here to enable upper case country in URL: e.g. /DE, /US
    {
      path: ':country',
      loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
      canActivate: [RouteGuardService],
      resolve: { RouteResolverService }
    },
    {
      path: ':country/signin',
      loadChildren: '../lazyModules/signin/signin.module#SigninModule'
    },
    {
      path: ':country/settings',
      loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
      canActivate: [RouteGuardService],
      resolve: { RouteResolverService },
      data: {
        active: true,
        allowedCountries: [],
        name: 'settings'
      },
    },
  ];

  // create a route for each country
  countries.forEach(country => additionalRoutes.push(
    {
      path: country.toLowerCase(),
      loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
      canActivate: [RouteGuardService],
      resolve: { RouteResolverService },
      data: {
        active: true,
        allowedCountries: [country],
        name: country.toUpperCase(),
      },
    }));


  routes.push(...additionalRoutes);
}
