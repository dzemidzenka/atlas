import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
 

export const DOMESTIC_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic',
    component: DashboardComponent,
    data: {
      description: 'DOMESTIC',
    }
  },
 
  // COMPONENTS
  {
    path: 'domestic/home',
    component: IFrameComponent,
    data: {
      isComponent: true,
      description: 'Home',
      iFrameUrl: 'http://sdaccdv01/users/user'
    },
  },
];
