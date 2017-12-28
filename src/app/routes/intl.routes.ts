import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const INTL_ROUTES: Routes = [
  // FOLDER
  {
    path: 'intl',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'INTL',
    },
  },

  // COMPONENTS
  // {
  //   path: 'intl/intl-home-native',
  //   loadChildren: '../lazyModules/intl/home/home.module#HomeModule',
  //   data: {
  //     isComponent: true,
  //     description: 'International Home (Native)',
  //   },
  // },
  {
    path: 'intl/intl-home',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      isFavorite: true,
      description: 'Home',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/dashboard',
    },
  },
  {
    path: 'intl/intl-order',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      isFavorite: true,
      description: 'Place an order',
      help: 'Place an order for sets to meet the requirements of the surgery you want to schedule',
      iFrameUrl: 'http://{{country}}.atlasglobal-dev.nuvasive.com/order/dashboard',
    },
  },
];
