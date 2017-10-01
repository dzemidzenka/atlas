import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReduxService } from './redux.service';
import { COUNTRY } from '../models/models';

@Injectable()
export class AuthService {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _reduxService: ReduxService,
  ) {
    this._isLoggedIn = true;
    this._reduxService.actionLogIn(Object.assign({
      email: 'test@company.com',
      nameFirst: 'Steve',
      nameLast: 'Dz',
      countryDefault: COUNTRY.US,
      allowedCountries: COUNTRY
    }));
  }

  private _isLoggedIn = false;


  logIn(email: string, password: string) {
    this._isLoggedIn = true;
    this._reduxService.actionLogIn(Object.assign({
      email: email,
      nameFirst: 'Steve',
      nameLast: 'Dz',
      countryDefault: COUNTRY.US,
      allowedCountries: COUNTRY
    }));

    const queryParams = this._route.snapshot.queryParams;
    const returnUrl = this._route.snapshot.queryParams['returnUrl'];
    const view = this._route.snapshot.queryParams['view'];

    if (returnUrl) {
      this._router.navigate([returnUrl], { queryParams: { view: view } });
    } else {
      this._router.navigate(['']);
    }
  }


  logOut() {
    this._isLoggedIn = false;
    this._reduxService.actionLogOut();

    const country = this._reduxService.getCurrentState().country;
    const urlParams = this._reduxService.getCurrentState().urlParams;
    const queryParams = this._reduxService.getCurrentState().queryParams;

    if (urlParams.length > 0) {
      this._router.navigate(
        [`/${country}/signin`],
        { queryParams: { returnUrl: urlParams.join('/'), ...queryParams } });
    } else {
      this._router.navigate([`/${country}/signin`]);
    }
  }


  passwordReset(email: string) {
  }

  getToken(): string {
    return '';
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
}
