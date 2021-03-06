import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const DOMESTIC_ADMIN_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/admin',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'Administration',
    }
  },

  // COMPONENTS
  {
    path: 'domestic/admin/users',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Manage Users',
      iFrameUrl: 'http://sdaccdv01/admin/users'
    },
  },
  {
    path: 'domestic/admin/product_config',
    loadChildren: '../lazyModules/order/order.module#OrderModule',
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Product Configuration',
    },
  },
  {
    path: 'domestic/admin/warehouse',
    canActivate: [RouteGuardService],
    component: IFrameComponent,
    data: {
      isComponent: true,
      description: 'Warehouses',
      iFrameUrl: 'http://sdaccdv01/Admin/warehouse'
    },
  },
  {
    path: 'domestic/admin/orders',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Orders',
      iFrameUrl: 'http://sdaccdv01/Admin/order'
    },
  },
  {
    path: 'domestic/admin/set_extensions',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Set Extensions',
      iFrameUrl: 'http://sdaccdv01/Admin/setextensionsetting'
    },
  },
  {
    path: 'domestic/admin/mobile',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Mobile',
      iFrameUrl: 'http://sdaccdv01/Admin/clientversion'
    },
  },
  {
    path: 'domestic/admin/logs',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Logs',
      iFrameUrl: 'http://sdaccdv01/Admin/log/search'
    },
  },
];
