import { Routes } from '@angular/router';
// import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const DOMESTIC_RMA_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/rma',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'RMA',
      iFrameUrl: 'http://sdaccdv01/RMA'
    },
  },
];
