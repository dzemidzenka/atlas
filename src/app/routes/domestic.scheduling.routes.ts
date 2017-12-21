import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
 

export const DOMESTIC_SCHEDULING_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/scheduling',
    component: DashboardComponent,
    data: {
      description: 'Scheduling',
    }
  },
  
  // COMPONENTS
  {
    path: 'domestic/scheduling/order',
    component: IFrameComponent,
    data: {
      isComponent: true,
      description: 'Order Scheduling',
      iFrameUrl: 'http://sdaccdv01/orders'
    },
  },
  {
    path: 'domestic/scheduling/courier',
    component: IFrameComponent,
    data: {
      isComponent: true,
      description: 'Courier Scheduling',
      iFrameUrl: 'http://sdaccdv01/Orders/Order/ScheduleCourier'
    },
  },
];
