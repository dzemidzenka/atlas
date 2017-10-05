import { Routes } from '@angular/router';
import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { COUNTRY } from '../models/models';


export const COUNTRY_ROUTES: Routes = [
  {
    path: 'us',
    component: DashboardComponent,
    data: { description: COUNTRY.US },
  },
  {
    path: 'de',
    component: DashboardComponent,
    data: { description: COUNTRY.DE },
  },
  {
    path: 'ru',
    component: DashboardComponent,
    data: { description: COUNTRY.RU },
  },
];
