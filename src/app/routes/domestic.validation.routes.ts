import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const DOMESTIC_VALIDATION_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/validation',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'Validation',
    }
  },
  
  // COMPONENTS
  {
    path: 'domestic/validation/order',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Pending Validation',
      iFrameUrl: 'http://sdaccdv01/orders/order/unvalidated'
    },
  },
  {
    path: 'domestic/validation/courier',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Mobile Queue',
      iFrameUrl: 'http://sdaccdv01/Orders/MobileOrder/Index'
    },
  },
];
