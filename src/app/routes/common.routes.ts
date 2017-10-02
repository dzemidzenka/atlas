import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';


export const COMMON_ROUTES: Routes = [
  {
    path: '',
    loadChildren: '../lazyModules/dashboard/dashboard.module#DashboardModule',
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
