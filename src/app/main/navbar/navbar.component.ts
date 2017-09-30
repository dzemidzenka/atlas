import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { ReduxService } from '../../providers/redux.service';
import { ACTION } from '../../models/models';
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

  isTcodeView$ = this._reduxService.state$.map(state => state.menuTcodeView);




  logOut() {
    this._authService.logOut();
  }


  tcodeView() {
    this._reduxService.actionTcodeView();
  }


  dashboard() {
    const country = this._reduxService.getCountry();
    if (country) {
      this._router.navigate([`/${country}`]);
    } else {
      this._router.navigate(['']);
    }
  }


  switchCountry(country: string) {
    const params = [...this._reduxService.getUrlParams()];
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
