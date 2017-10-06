import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  // NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  // NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
} from '@nebular/theme';

import {
  ThemeSwitcherComponent,
} from './components';


const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  RouterModule,
  NbCardModule,
  NbLayoutModule,
  // NbTabsetModule,
  // NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
];

const COMPONENTS = [
  ThemeSwitcherComponent,
];



const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'cosmic',
    },
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES,],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
