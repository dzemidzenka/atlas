import { Component } from '@angular/core';
import { ReduxService } from '../../providers/redux.service';
import { ACTION } from '../../models/models';

@Component({
  selector: 'atlas-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private _reduxService: ReduxService,
  ) { }

  menu$ = this._reduxService.state$
    .filter(state => state.action.op === ACTION.ROUTE || state.action.op === ACTION.MENU_VIEW_TCODE)
    .map(state => state.menu.filter(menu => menu.active));
}
