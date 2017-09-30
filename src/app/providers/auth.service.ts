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
    const returnUrl = this._route.snapshot.queryParams['returnUrl'];
    if (returnUrl) {
      this._router.navigate([returnUrl]);
    } else if (this._reduxService.getCountry() !== 'undefined') {
      this._router.navigate([`/${this._reduxService.getCountry()}`]);
    } else {
      this._router.navigate(['']);
    }
  }

  logOut() {
    this._isLoggedIn = false;
    this._reduxService.actionLogOut();
    if (this._reduxService.getUrlParams.length > 0) {
      this._router.navigate(
        [`/${this._reduxService.getCountry()}/signin`],
        { queryParams: { returnUrl: this._reduxService.getUrlParams().join('/') } });
    } else {
      this._router.navigate(
        [`/${this._reduxService.getCountry()}/signin`]);
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
