import { Routes } from '@angular/router';
// import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
 

export const DOMESTIC_RMA_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/rma',
    component: IFrameComponent,
    data: {
      isComponent: true,
      description: 'RMA',
      iFrameUrl: 'http://sdaccdv01/RMA'
    },
  },
];
