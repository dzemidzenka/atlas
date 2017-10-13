import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';
import { DashboardComponent } from '../main/dashboard/dashboard.component';


export const CRM_ROUTES: Routes = [
  // FOLDER
  {
    path: 'crm',
    component: DashboardComponent,
    data: {
      description: 'crm',
    }
  },

  // COMPONENTS
  {
    path: 'crm/crm-contacts',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Contacts',
      iFrameUrl: 'http://sdaccdv01/crm/contacts'
    },
  },
  {
    path: 'crm/crm-accounts',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Accounts',
      iFrameUrl: 'http://sdaccdv01/crm/accounts'
    },
  },
  {
    path: 'crm/crm-salesreps',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Sales Reps',
      iFrameUrl: 'http://sdaccdv01/crm/sales/plan/salesreps'
    },
  },
  {
    path: 'crm/crm-apperian',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Apperian',
      iFrameUrl: 'http://sdaccdv01/crm/appregistration'
    },
  },
  {
    path: 'crm/crm-pricing_requests',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Contract Pricing Requests',
      iFrameUrl: 'http://sdaccdv01/crm/contractpricingrequests'
    },
  },
  {
    path: 'crm/crm-event_requests',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Event Requests',
      iFrameUrl: 'http://sdaccdv01/crm/eventrequest/list/pendingapproval'
    },
  },
  {
    path: 'crm/crm-intl_event_requests',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'International Event Requests',
      iFrameUrl: 'http://sdaccdv01/crm/internationaleventrequest'
    },
  },
  {
    path: 'crm/crm-permissions',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Permissions',
      iFrameUrl: 'http://sdaccdv01/crm/security/permission'
    },
  },
  {
    path: 'crm/crm-configurations',
    loadChildren: '../lazyModules/iframe/iframe.module#IFrameModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Configurations',
      iFrameUrl: 'http://sdaccdv01/crm/security/configuration'
    },
  },
];
