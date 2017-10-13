import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';
import { DashboardComponent } from '../main/dashboard/dashboard.component';


export const INTL_REPORTS_ROUTES: Routes = [
  // FOLDER
  {
    path: 'intl/reports',
    component: DashboardComponent,
    data: {
      description: 'Reports',
    }
  },

  // COMPONENTS
  {
    path: 'intl/reports/intl-orders_report',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Orders Report',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/report',
    },
  },
  {
    path: 'intl/reports/intl-inventory_report',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Inventory Report',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/Inventoryreport',
    },
  },
  {
    path: 'intl/reports/intl-customer_relationships_report',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Customer Relationships Report',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/customerrelationshipsreport',
    },
  },
];
