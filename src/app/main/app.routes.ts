import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/US/dashboard',
    pathMatch: 'full'
  },
  {
    path: ':country/signin',
    loadChildren: '../lazyModules/signin/signin.module#SigninModule'
  },
  {
    path: ':country/dashboard',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService }
  },
  {
    path: ':country/order',
    loadChildren: '../lazyModules/order/order.module#OrderModule',
    canActivate: [RouteGuardService],
    data: { folder: 'main', name: 'Order' },
    resolve: { RouteResolverService }
  },
  {
    path: ':country/settings',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    data: { folder: 'main', name: 'Settings' },
    resolve: { RouteResolverService }
  },
  {
    path: ':country/demo',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    data: { name: 'Demo' },
    resolve: { RouteResolverService }
  },
  // {
  //   path: '**',
  //   redirectTo: '/US/dashboard'
  // }
];
