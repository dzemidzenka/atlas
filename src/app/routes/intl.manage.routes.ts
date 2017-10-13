import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';
import { DashboardComponent } from '../main/dashboard/dashboard.component';


export const INTL_MANAGE_ROUTES: Routes = [
  // FOLDER
  {
    path: 'intl/manage',
    component: DashboardComponent,
    data: {
      description: 'Manage',
    }
  },

  // COMPONENTS
  {
    path: 'intl/manage/intl-customer_relationships',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Customer Relationships',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/contact/customers/manage',
    },
  },
  {
    path: 'intl/manage/intl-product_configuration',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Product Configuration',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/configurator',
    },
  },
  {
    path: 'intl/manage/intl-shipping',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Shipping',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/shippingzones',
    },
  },
  {
    path: 'intl/manage/intl-warehouse_picking_order',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Warehouse Picking Order',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/inventory/warehouse/pickorder/manage',
    },
  },
  {
    path: 'intl/manage/intl-users',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Users',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/user/manage',
    },
  },
  {
    path: 'intl/manage/intl-localization',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Localization',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/translation/manage',
    },
  },
  {
    path: 'intl/manage/intl-subscriptions',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'subscriptions',
      iFrameUrl: 'http://de.atlasglobal-dev.nuvasive.com/user/subscription',
    },
  },
];
