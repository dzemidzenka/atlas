import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './components';


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


const BASE_MODULES = [
  CommonModule
];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
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
  imports: [...BASE_MODULES, ...NB_MODULES],
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
