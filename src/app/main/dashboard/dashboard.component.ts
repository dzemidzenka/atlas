import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ReduxService } from '../../providers/redux.service';
import { DASHBOARD_THEME, VIEW, IMenuModel } from '../../models/models';

@Component({
  selector: 'atlas-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(
    private _router: Router,
    private _reduxService: ReduxService,
  ) { }

  TILES = DASHBOARD_THEME.TILES;
  STICKY_NOTES = DASHBOARD_THEME.STICKY_NOTES;

  state$ = this._reduxService.state$.map(state => Object.assign({
    view: state.view,
    theme: state.theme,
    menu: state.menu.filter(menu => menu.active)
  }));



  onNavigate(urlParams: Array<string>) {
    this._router.navigate([urlParams.join('/')]);
  }

  onFavoriteToggle(item: IMenuModel) {
    this._reduxService.actionFavoriteToggle(item);
  }
}
