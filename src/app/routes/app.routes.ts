import { Routes } from '@angular/router';
import { COMMON_ROUTES } from './common.routes';
import { COUNTRY_ROUTES } from './country.routes';
import { ATLAS_ROUTES } from './atlas.routes';
import { SAP_ROUTES } from './sap.routes';
import { DEMO_ROUTES } from './demo.routes';


export const ROUTES: Routes = [
  ...COMMON_ROUTES,
  ...COUNTRY_ROUTES,
  ...ATLAS_ROUTES,
  ...SAP_ROUTES,
  ...DEMO_ROUTES,
  // ** must be last
  {
    path: '**',
    redirectTo: 'us/page-not-found',
  }
];
