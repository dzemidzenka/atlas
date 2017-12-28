import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const DOMESTIC_RELEASING_ROUTES: Routes = [
  // FOLDER
  {
    path: 'domestic/releasing',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'Releasing',
    }
  },
  
  // COMPONENTS
  {
    path: 'domestic/releasing/summary',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Releasing Queue',
      iFrameUrl: 'http://sdaccdv01/Orders/Releasing/Summary'
    },
  },
  {
    path: 'domestic/releasing/sets',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Constrained Sets',
      iFrameUrl: 'http://sdaccdv01/Orders/Releasing/ConstrainedSets'
    },
  },
  {
    path: 'domestic/releasing/allograft',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Constrained Allograft',
      iFrameUrl: 'http://sdaccdv01/Orders/Releasing/ConstrainedAllograft'
    },
  },  
  {
    path: 'domestic/releasing/courier_orders',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Courier Orders',
      iFrameUrl: 'http://sdaccdv01/Orders/Releasing/CourierShipments'
    },
  },  
  {
    path: 'domestic/releasing/pending_field_source',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Pending Field Source',
      iFrameUrl: 'http://sdaccdv01/Orders/Releasing/PendingFieldSource'
    },
  },  
  {
    path: 'domestic/releasing/dropped',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Dropped Orders',
      iFrameUrl: 'http://sdaccdv01/Orders/Releasing/DroppedToday'
    },
  },  
  {
    path: 'domestic/releasing/field_response_queue',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Field Response Queue',
      iFrameUrl: 'http://sdaccdv01/Orders/Releasing/SearchFieldResponseQueue'
    },
  },     
  {
    path: 'domestic/releasing/auto_audit',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Auto Releasing Audit',
      iFrameUrl: 'http://sdaccdv01/Orders/Releasing/AutoReleasingAudit'
    },
  },   
];
