import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const INTL_REPORTS_ROUTES: Routes = [
  // FOLDER
  {
    path: 'intl/reports',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'Reports',
    }
  },

  // COMPONENTS
  {
    path: 'intl/reports/intl-orders_report',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Orders Report',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/report',
    },
  },
  {
    path: 'intl/reports/intl-inventory_report',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Inventory Report',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/Inventoryreport',
    },
  },
  {
    path: 'intl/reports/intl-customer_relationships_report',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Customer Relationships Report',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/customerrelationshipsreport',
    },
  },
];
