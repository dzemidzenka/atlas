import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const DOMESTIC_SCHEDULING_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/scheduling',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'Scheduling',
    }
  },
  
  // COMPONENTS
  {
    path: 'domestic/scheduling/order',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Order Scheduling',
      iFrameUrl: 'http://sdaccdv01/orders'
    },
  },
  {
    path: 'domestic/scheduling/courier',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Courier Scheduling',
      iFrameUrl: 'http://sdaccdv01/Orders/Order/ScheduleCourier'
    },
  },
];
