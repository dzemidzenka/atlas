import { Routes } from '@angular/router';
import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { IFrameComponent } from '../shared/components/iframe/iframe.component';


export const DOMESTIC_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic',
    component: DashboardComponent,
    data: {
      description: 'Atlas Domestic',
    }
  },

  // COMPONENTS
  {
    path: 'domestic/domestic-unvalidated',
    component: IFrameComponent,
    data: {
      isComponent: true,
      description: 'Unvalidated Orders',
      iFrameUrl: 'http://sdaccdv01/Orders/Order/Unvalidated'
    },
  },
];
