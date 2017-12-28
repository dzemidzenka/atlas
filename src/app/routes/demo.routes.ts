import { Routes } from '@angular/router';
import { DashboardComponent } from '@main/dashboard/dashboard.component';
import { RouteGuardService } from './route-guard.service';


export const DEMO_ROUTES: Routes = [
  // FOLDER
  {
    path: 'demo',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      description: 'demo',
      excludeFromMenu: true
    }
  },

  // COMPONENTS
  {
    path: 'demo/demo1',
    loadChildren: '../lazyModules/demo/demo1/demo1.module#Demo1Module',
    canActivate: [RouteGuardService],
    data: {
      isComponent: true,
      description: 'Demo1',
    },
  },
];
