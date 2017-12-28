import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const CRM_ROUTES: Routes = [
  // FOLDER
  {
    path: 'crm',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'CRM',
    }
  },

  // COMPONENTS
  {
    path: 'crm/dashboard',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Dashboard',
      iFrameUrl: 'http://sdaccdv01/crm/dashboard'
    },
  },
  {
    path: 'crm/crm-contacts',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Contacts',
      iFrameUrl: 'http://sdaccdv01/crm/contacts'
    },
  },
  {
    path: 'crm/crm-accounts',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Accounts',
      iFrameUrl: 'http://sdaccdv01/crm/accounts'
    },
  },
  {
    path: 'crm/crm-salesreps',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Sales Reps',
      iFrameUrl: 'http://sdaccdv01/crm/sales/plan/salesreps'
    },
  },
  {
    path: 'crm/crm-apperian',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Apperian',
      iFrameUrl: 'http://sdaccdv01/crm/appregistration'
    },
  },
  {
    path: 'crm/crm-pricing_requests',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Contract Pricing Requests',
      iFrameUrl: 'http://sdaccdv01/crm/contractpricingrequests'
    },
  },
  {
    path: 'crm/crm-event_requests',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Event Requests',
      iFrameUrl: 'http://sdaccdv01/crm/eventrequest/list/pendingapproval'
    },
  },
  {
    path: 'crm/crm-intl_event_requests',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'International Event Requests',
      iFrameUrl: 'http://sdaccdv01/crm/internationaleventrequest'
    },
  },
  {
    path: 'crm/crm-permissions',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Permissions',
      iFrameUrl: 'http://sdaccdv01/crm/security/permission'
    },
  },
  {
    path: 'crm/crm-configurations',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Configurations',
      iFrameUrl: 'http://sdaccdv01/crm/security/configuration'
    },
  },
];
