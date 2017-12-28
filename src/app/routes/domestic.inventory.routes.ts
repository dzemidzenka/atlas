import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const DOMESTIC_INVENTORY_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/inventory',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'Inventory',
    }
  },
  
  // COMPONENTS
  {
    path: 'domestic/inventory/csa',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'CSA',
      iFrameUrl: 'http://sdaccdv01/orders/inventory/csareport'
    },
  },
  {
    path: 'domestic/inventory/wms',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: "Where's My Stuff",
      iFrameUrl: 'http://sdaccdv01/Inventory/Search'
    },
  },
  {
    path: 'domestic/inventory/manage_par',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Manage Par Components',
      iFrameUrl: 'http://sdaccdv01/Inventory/ManagePar'
    },
  },
];
