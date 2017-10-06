import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { ReduxService } from '../../providers/redux.service';
import { ACTION, VIEW, DASHBOARD_THEME, COUNTRY, IUserModel } from '../../models/models';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import isEmpty from 'lodash-es/isEmpty';


@Component({
  selector: 'atlas-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private _authService: AuthService,
    private _reduxService: ReduxService,
    private _router: Router,
  ) { }

  @Input() position = 'normal';
  VIEW = Object.values(VIEW);
  COUNTRY = Object.values(COUNTRY);

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Logout', target: 'logout' }];

  state$ = this._reduxService.state$.map(state => Object.assign({
    country: state.country,
    isLoggedIn: !isEmpty(state.user),
    user: state.user,
    notifications: state.notifications
  }));


  clearNotifications() {
    this._reduxService.actionClearNotifications();
  }

  switchView(view: VIEW) {
    const country = this._reduxService.getCurrentState().country;
    if (country) {
      this._router.navigate([`/${country}/`], { queryParams: { view: view } });
    } else {
      this._router.navigate(['']);
    }
  }

  logOut() {
    this._authService.logOut();
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  startSearch() {
  }


  menuClick(event) {
    if (event.target === 'logout') {
      this._authService.logOut();
    }
  }
}
