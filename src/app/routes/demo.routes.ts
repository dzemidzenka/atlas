import { Routes } from '@angular/router';


export const DEMO_ROUTES: Routes = [
  {
    path: ':country/forminputs',
    loadChildren: '../lazyModules/form-inputs/form-inputs.module#FormInputsModule',
    data: {
      isComponent: true,
      description: 'Form Inputs',
    },
  },
  {
    path: ':country/formlayouts',
    loadChildren: '../lazyModules/form-layouts/form-layouts.module#FormLayoutsModule',
    data: {
      isComponent: true,
      description: 'Form Layouts',
    },
  },
];
