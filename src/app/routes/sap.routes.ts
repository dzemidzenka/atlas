import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';
import { DashboardComponent } from '../main/dashboard/dashboard.component';


export const SAP_ROUTES: Routes = [
  // FOLDERS
  {
    path: ':country/sap',
    component: DashboardComponent,
    data: {
      description: 'sap',
    }
  },

  // COMPONENTS
  {
    path: ':country/sap/app1',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'App1',
    },
  },
  {
    path: ':country/sap/app2',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'App2',
    },
  },
  {
    path: ':country/sap/app3',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'App3',
    },
  },
];
