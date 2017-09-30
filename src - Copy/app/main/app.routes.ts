import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';


// export const FOLDERS = [
//   {

//   }
// ];

export const ROUTES: Routes = [
  {
    path: ':country/order',
    loadChildren: '../lazyModules/order/order.module#OrderModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      active: true,
      allowedCountries: ['us'],
      name: 'Order'
    },
  },
  {
    path: ':country/settings/test/admin',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      active: true,
      allowedCountries: ['us', 'de'],
      name: 'Admin'
    },
  },
  {
    path: ':country/settings/test/admin1',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      active: true,
      allowedCountries: ['de'],
      name: 'Admin1'
    },
  },
  {
    path: ':country/settings/app',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      active: true,
      // allowedCountries: ['de'],
      name: 'Settings'
    },
  },

  // {
  //   path: '**',
  //   loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
  //   canActivate: [RouteGuardService],
  //   resolve: { RouteResolverService }
  // },
];
