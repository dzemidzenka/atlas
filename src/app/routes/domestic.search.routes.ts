import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const DOMESTIC_SEARCH_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/search',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'Search',
    }
  },
  
  // COMPONENTS
  {
    path: 'domestic/search/order',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Order Search',
      iFrameUrl: 'http://sdaccdv01/orders/order/search'
    },
  },
  {
    path: 'domestic/search/fedex',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Fedex Pickups',
      iFrameUrl: 'http://sdaccdv01/Orders/Pickup/Search'
    },
  },
  {
    path: 'domestic/search/fedex_tracking',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Fedex Tracking',
      iFrameUrl: 'http://sdaccdv01/Orders/FedExTracking/Index'
    },
  },
  {
    path: 'domestic/search/tasks',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Tasks',
      iFrameUrl: 'http://sdaccdv01/Task/Task'
    },
  },  
];
