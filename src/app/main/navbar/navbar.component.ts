import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { ReduxService } from '../../providers/redux.service';
import { ACTION, VIEW, DASHBOARD_THEME, COUNTRY, IUserModel } from '../../models/models';
import isEmpty from 'lodash-es/isEmpty';
import { NbMenuService, NbSidebarService } from '@nebular/theme';


@Component({
  selector: 'atlas-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _reduxService: ReduxService,
    private sidebarService: NbSidebarService,
  ) { }

  state$ = this._reduxService.state$.map(state => Object.assign({
    country: state.country,
    isLoggedIn: !isEmpty(state.user),
    user: state.user,
    notifications: state.notifications
  }));

  VIEW = Object.values(VIEW);
  COUNTRY = Object.values(COUNTRY);
  DASHBOARD_THEME = Object.values(DASHBOARD_THEME);

  userMenu = [{ title: 'Profile' }, { title: 'Logout', target: 'logout' }];


  logOut() {
    this._authService.logOut();
  }



  switchView(view: VIEW) {
    const country = this._reduxService.getCurrentState().country;
    if (country) {
      this._router.navigate([`/${country}/`], { queryParams: { view: view } });
    } else {
      this._router.navigate(['']);
    }
  }


  switchCountry(country: string) {
    const params = [...this._reduxService.getCurrentState().urlParams];
    params[0] = country;
    this._router.navigate([params.join('/')]);
  }

  switchTheme(theme: string) {
    this._reduxService.actionDashboardTheme(theme);
  }

  clearNotifications() {
    this._reduxService.actionClearNotifications();
  }



  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    return false;
  }
  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }
  menuClick(event) {
    console.log(event);

    if (event.target === 'logout') {
      this._authService.logOut();
    }
  }



  // displayMode: string = 'default';
  // multi = false;
  // hideToggle = false;
  // disabled = false;
  // showPanel3 = true;
  // expandedHeight: string;
  // collapsedHeight: string;
}
