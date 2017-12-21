import { Routes } from '@angular/router';
import { INTL_ROUTES } from './intl.routes';
import { INTL_MANAGE_ROUTES } from './intl.manage.routes';
import { INTL_INVENTORY_ROUTES } from './intl.inventory.routes';
import { INTL_REPORTS_ROUTES } from './intl.reports.routes';
import { DOMESTIC_ROUTES } from './domestic.routes';
import { DOMESTIC_SCHEDULING_ROUTES } from './domestic.scheduling.routes';
import { DOMESTIC_VALIDATION_ROUTES } from './domestic.validation.routes';
import { DOMESTIC_RELEASING_ROUTES } from './domestic.releasing.routes';
import { DOMESTIC_SEARCH_ROUTES } from './domestic.search.routes';
import { DOMESTIC_INVENTORY_ROUTES } from './domestic.inventory.routes';
import { DOMESTIC_CONSIGNMENT_ROUTES } from './domestic.consignment.routes';
import { DOMESTIC_RMA_ROUTES } from './domestic.rma.routes';
import { DOMESTIC_ADMIN_ROUTES } from './domestic.admin.routes';
import { CRM_ROUTES } from './crm.routes';
import { SAP_ROUTES } from './sap.routes';
import { DEMO_ROUTES } from './demo.routes';
  
export const ROUTES: Routes = [
    ...INTL_ROUTES,
    ...INTL_MANAGE_ROUTES,
    ...INTL_INVENTORY_ROUTES,
    ...INTL_REPORTS_ROUTES,
    ...DOMESTIC_ROUTES,
    ...DOMESTIC_SCHEDULING_ROUTES,
    ...DOMESTIC_VALIDATION_ROUTES,
    ...DOMESTIC_RELEASING_ROUTES,
    ...DOMESTIC_SEARCH_ROUTES,
    ...DOMESTIC_INVENTORY_ROUTES,
    ...DOMESTIC_CONSIGNMENT_ROUTES,
    ...DOMESTIC_RMA_ROUTES,
    ...DOMESTIC_ADMIN_ROUTES,
    ...CRM_ROUTES,
    ...SAP_ROUTES,
    ...DEMO_ROUTES
];
