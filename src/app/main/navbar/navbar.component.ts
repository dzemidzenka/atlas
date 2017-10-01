import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { ReduxService } from '../../providers/redux.service';
import { ACTION, VIEW } from '../../models/models';
import isEmpty from 'lodash-es/isEmpty';


@Component({
  selector: 'atlas-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _reduxService: ReduxService,
  ) { }

  isLoggedIn$ = this._reduxService.state$
    // .filter(state => Object.keys(state).length > 0)
    // .filter(state => state.action.op === ACTION.LOGIN || state.action.op === ACTION.LOGOUT)
    .map(state => !isEmpty(state.user));

  isViewTcode$ = this._reduxService.state$.map(state => state.menuViewTcode);

  DASHBOARD: VIEW = VIEW.DASHBOARD;
  FAVORITE: VIEW = VIEW.FAVORITE;
  RECENT: VIEW = VIEW.RECENT;



  logOut() {
    this._authService.logOut();
  }


  viewTcode() {
    this._reduxService.actionViewTcode();
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




  displayMode: string = 'default';
  multi = false;
  hideToggle = false;
  disabled = false;
  showPanel3 = true;
  expandedHeight: string;
  collapsedHeight: string;
}
