import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';



export const ROUTES: Routes = [
  {
    path: ':country/order',
    loadChildren: '../lazyModules/order/order.module#OrderModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      isFavorite: true,
      name: 'Order',
    },
  },
  {
    path: ':country/atlas/test/admin',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      name: 'Admin',
    },
  },
  {
    path: ':country/atlas/test/admin1',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      name: 'Admin1',
    },
  },
  {
    path: ':country/sap/app1',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      name: 'Settings',
    },
  },




  {
    path: '',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
  },
  // {
  //   path: ':country',
  //   loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
  // },
  {
    path: ':country/atlas',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
    data: {
      name: 'atlas',
    },
  },
  {
    path: ':country/atlas/test',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
    data: {
      name: 'test',
    },
  },
  {
    path: ':country/sap',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
    data: {
      name: 'sap',
    }
  },
  {
    path: ':country/signin',
    loadChildren: '../lazyModules/signin/signin.module#SigninModule',
  },

  {
    path: ':country/page-not-found',
    loadChildren: '../lazyModules/page-not-found/page-not-found.module#PageNotFoundModule',
  },
];
