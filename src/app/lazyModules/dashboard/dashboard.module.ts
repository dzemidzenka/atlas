import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../../providers/route-guard.service';
import { DashboardComponent } from './dashboard.component';
import { StickynotesComponent } from './stickynotes/stickynotes.component';
import { TilesComponent } from './tiles/tiles.component';

import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
} from '@angular/material';




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
    MdButtonModule,
    MdCardModule,
    MdIconModule,
  ],
  declarations: [
    DashboardComponent,
    StickynotesComponent,
    TilesComponent,
  ],
  providers: [
    RouteGuardService,
  ],
})
export class DashboardModule { }
