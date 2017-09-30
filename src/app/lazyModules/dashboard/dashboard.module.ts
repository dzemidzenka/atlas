import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StickynotesComponent } from './stickynotes/stickynotes.component';
import { RouteGuardService } from '../../providers/route-guard.service';


const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
  ],
  declarations: [
    DashboardComponent,
    StickynotesComponent,
  ],
  providers: [
    RouteGuardService,
  ],
})
export class DashboardModule { }
