import { Routes } from '@angular/router';
import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { AppComponent } from '../main/app.component';

export const COMMON_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    },
    {
        path: 'login',
        component: AppComponent
    }
    // {
    //   path: 'page-not-found',
    //   loadChildren: '../lazyModules/page-not-found/page-not-found.module#PageNotFoundModule',
    // },
];
