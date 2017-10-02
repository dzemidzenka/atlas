import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';


export const SAP_ROUTES: Routes = [
  // FOLDERS
  {
    path: ':country/sap',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
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
];