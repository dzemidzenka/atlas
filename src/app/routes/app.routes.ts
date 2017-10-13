import { Routes } from '@angular/router';
import { COMMON_ROUTES } from './common.routes';
import { INTL_ROUTES } from './intl.routes';
import { INTL_MANAGE_ROUTES } from './intl.manage.routes';
import { INTL_INVENTORY_ROUTES } from './intl.inventory.routes';
import { INTL_REPORTS_ROUTES } from './intl.reports.routes';
import { DOMESTIC_ROUTES } from './domestic.routes';
import { CRM_ROUTES } from './crm.routes';
import { SAP_ROUTES } from './sap.routes';
import { DEMO_ROUTES } from './demo.routes';


export const ROUTES: Routes = [
  ...COMMON_ROUTES,
  ...INTL_ROUTES,
  ...INTL_MANAGE_ROUTES,
  ...INTL_INVENTORY_ROUTES,
  ...INTL_REPORTS_ROUTES,
  ...DOMESTIC_ROUTES,
  ...CRM_ROUTES,
  ...SAP_ROUTES,
  ...DEMO_ROUTES,
  // ** must be last
  {
    path: '**',
    redirectTo: 'page-not-found',
  }
];
