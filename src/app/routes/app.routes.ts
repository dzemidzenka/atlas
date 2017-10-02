import { Routes } from '@angular/router';
import { COMMON_ROUTES } from './common.routes';
import { ATLAS_ROUTES } from './atlas.routes';
import { SAP_ROUTES } from './sap.routes';



export const ROUTES: Routes = [
  ...COMMON_ROUTES,
  ...ATLAS_ROUTES,
  ...SAP_ROUTES,
  // {
  //   path: '',
  //   loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
  // },
  // {
  //   path: ':country',
  //   loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
  // },
  // {
  //   path: ':country/atlas',
  //   loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
  //   data: {
  //     description: 'atlas',
  //   },
  // },
  // {
  //   path: ':country/atlas/manage',
  //   loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
  //   data: {
  //     description: 'Manage',
  //   },
  // },
  // {
  //   path: ':country/sap',
  //   loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
  //   data: {
  //     description: 'sap',
  //   }
  // },
];
