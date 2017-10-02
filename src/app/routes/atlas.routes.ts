import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';



export const ATLAS_ROUTES: Routes = [
  // ***** FOLDERS *****
  {
    path: ':country/atlas',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
    data: {
      description: 'atlas',
    },
  },
  {
    path: ':country/atlas/manage',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
    data: {
      description: 'Manage',
    },
  },
  {
    path: ':country/atlas/inventory',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
    data: {
      description: 'Inventory',
    },
  },
  {
    path: ':country/atlas/reports',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
    data: {
      description: 'Reports',
    },
  },


  // ***** COMPONENTS *****
  // ATLAS
  {
    path: ':country/atlas/order',
    loadChildren: '../lazyModules/order/order.module#OrderModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      isFavorite: true,
      description: 'Place an order',
      help: 'Place an order for sets to meet the requirements of the surgery you want to schedule',
    },
  },

  // ATLAS/MANAGE
  {
    path: ':country/atlas/manage/customer_relationships',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Customer Relationships',
    },
  },
  {
    path: ':country/atlas/manage/product_configuration',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Product Configuration',
    },
  },
  {
    path: ':country/atlas/manage/shipping',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Shipping',
    },
  },
  {
    path: ':country/atlas/manage/warehouse_picking_order',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Warehouse Picking Order',
    },
  },
  {
    path: ':country/atlas/manage/users',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Users',
    },
  },
  {
    path: ':country/atlas/manage/localization',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Localization',
    },
  },
  {
    path: ':country/atlas/manage/subscriptions',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'subscriptions',
    },
  },



// ATLAS/INVENTORY
  {
    path: ':country/atlas/inventory/contrained_materials',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Constrained Materials',
    },
  },
  {
    path: ':country/atlas/inventory/set_inventory',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Set Inventory',
    },
  },
  {
    path: ':country/atlas/inventory/set_shipping',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Set Shipping',
    },
  },
  {
    path: ':country/atlas/inventory/billing_extras',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Billing/Extras',
    },
  },
  {
    path: ':country/atlas/inventory/sub_to_sub_request',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Sub To Sub Request',
    },
  },



// ATLAS/REPORTS
{
  path: ':country/atlas/reports/orders',
  loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
  canActivate: [RouteGuardService],
  resolve: { RouteResolverService },
  data: {
    isComponent: true,
    description: 'Orders Report',
  },
},
{
  path: ':country/atlas/reports/inventory',
  loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
  canActivate: [RouteGuardService],
  resolve: { RouteResolverService },
  data: {
    isComponent: true,
    description: 'Inventory Report',
  },
},
{
  path: ':country/atlas/reports/customer_relationships',
  loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
  canActivate: [RouteGuardService],
  resolve: { RouteResolverService },
  data: {
    isComponent: true,
    description: 'Customer Relationships Report',
  },
},

];
