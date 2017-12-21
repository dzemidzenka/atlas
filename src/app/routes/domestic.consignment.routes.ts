import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
 

export const DOMESTIC_CONSIGNMENT_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/consignment',
    component: DashboardComponent,
    data: {
      description: 'Consignment',
    }
  },
  
  // COMPONENTS
  {
    path: 'domestic/consignment/approval_queue',
    component: IFrameComponent,
    data: {
      isComponent: true,
      description: 'Approval Queue',
      iFrameUrl: 'http://sdaccdv01/consignment/consignment/consignmentRequestsforapprovalmaster'
    },
  },
  {
    path: 'domestic/consignment/master_form',
    component: IFrameComponent,
    data: {
      isComponent: true,
      description: 'Consignment Master Form',
      iFrameUrl: 'http://sdaccdv01/Consignment/Consignment/ConsignmentMasterForm'
    },
  },
  {
    path: 'domestic/consignment/short_sets',
    component: IFrameComponent,
    data: {
      isComponent: true,
      description: 'Short Consignment Sets',
      iFrameUrl: 'http://sdaccdv01/Consignment/Consignment/ShortConsignmentSetsMaster'
    },
  },
];
