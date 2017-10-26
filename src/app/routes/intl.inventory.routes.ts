import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';
import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { IFrameComponent } from '../shared/components/iframe/iframe.component';


export const INTL_INVENTORY_ROUTES: Routes = [
  // FOLDER
  {
    path: 'intl/inventory',
    component: DashboardComponent,
    data: {
      description: 'Inventory',
    }
  },

  // COMPONENTS
  {
    path: 'intl/inventory/intl-constrained',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Constrained Materials',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/inventory/constrained',
    },
  },
  {
    path: 'intl/inventory/intl-set_inventory',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'set inventory',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/inventory/allocation/current',
    },
  },
  {
    path: 'intl/inventory/intl-shipping',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Shipping',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/inventory/shipping',
    },
  },
  {
    path: 'intl/inventory/intl-billing',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Billing/Extras',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/inventory/history',
    },
  },
  {
    path: 'intl/inventory/intl-sub_to_sub',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Sub To Sub',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/inventory/transferRequest/dashboard',
    },
  },
];
