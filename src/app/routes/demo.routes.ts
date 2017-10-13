import { Routes } from '@angular/router';
import { DashboardComponent } from '../main/dashboard/dashboard.component';


export const DEMO_ROUTES: Routes = [
  // FOLDER
  {
    path: 'demo',
    component: DashboardComponent,
    data: {
      description: 'demo',
    }
  },

  // COMPONENTS
  {
    path: 'demo/demo1',
    loadChildren: '../lazyModules/demo/demo1/demo1.module#Demo1Module',
    data: {
      isComponent: true,
      description: 'Demo1',
    },
  },
];
