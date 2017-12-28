import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const DOMESTIC_CONSIGNMENT_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/consignment',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'Consignment',
    }
  },
  
  // COMPONENTS
  {
    path: 'domestic/consignment/approval_queue',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Approval Queue',
      iFrameUrl: 'http://sdaccdv01/consignment/consignment/consignmentRequestsforapprovalmaster'
    },
  },
  {
    path: 'domestic/consignment/master_form',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Consignment Master Form',
      iFrameUrl: 'http://sdaccdv01/Consignment/Consignment/ConsignmentMasterForm'
    },
  },
  {
    path: 'domestic/consignment/short_sets',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Short Consignment Sets',
      iFrameUrl: 'http://sdaccdv01/Consignment/Consignment/ShortConsignmentSetsMaster'
    },
  },
];
