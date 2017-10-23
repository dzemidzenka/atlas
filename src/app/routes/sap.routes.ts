import { Routes } from '@angular/router';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';
import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { IFrameComponent } from '../shared/iframe/iframe.component';


export const SAP_ROUTES: Routes = [
  // FOLDER
  {
    path: 'sap',
    component: DashboardComponent,
    data: {
      description: 'sap'
    }
  },

  // COMPONENTS
  {
    path: 'sap/sap-gui',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
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
    resolve: { RouteResolverService },
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
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'App2'
    }
  },
  {
    path: 'sap/sap-app3',
    loadChildren: '../lazyModules/settings/settings.module#SettingsModule',
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'App3'
    }
  },
  {
    path: 'sap/configurator',
    component: IFrameComponent,
    canActivate: [RouteGuardService],
    resolve: { RouteResolverService },
    data: {
      isComponent: true,
      description: 'Configurator',
      iFrameUrl: 'https://configurator-61bec.firebaseapp.com/configurator'
    }
  }
];
