import { Routes } from '@angular/router';
import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { LoginComponent } from '../main/login/login.component';


export const COMMON_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'page-not-found',
  //   loadChildren: '../lazyModules/page-not-found/page-not-found.module#PageNotFoundModule',
  // },
];
