import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../providers/redux.service';

@Component({
  selector: 'atlas-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(
    private _reduxService: ReduxService,
  ) { }

  menu$ = this._reduxService.state$.map(state => state.menu.filter(menu => menu.active));
}
