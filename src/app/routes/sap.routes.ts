import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { IFrameComponent } from '@shared/components/iframe/iframe.component';
import { RouteGuardService } from './route-guard.service';


export const SAP_ROUTES: Routes = [
  // FOLDER
  {
    path: 'sap',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'SAP'
    }
  },

  // COMPONENTS
  {
    path: 'sap/sap-gui',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'SAPGUI',
      iFrameUrl:
        'http://sdsaped2.nuvasive.com:8020/sap/bc/gui/sap/its/webgui?sap-client=300&~transaction=SE80'
    }
  },
  {
    path: 'sap/sap-zsetinfo',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'ZSETINFO',
      iFrameUrl:
        'http://sdsaped2.nuvasive.com:8020/sap/bc/gui/sap/its/webgui?sap-client=300&~transaction=ZSETINFO'
    }
  },
  {
    path: 'sap/sap-app2',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'App2'
    }
  },
  {
    path: 'sap/configurator',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Configurator',
      iFrameUrl: 'https://configurator-61bec.firebaseapp.com/configurator'
    }
  }
];
