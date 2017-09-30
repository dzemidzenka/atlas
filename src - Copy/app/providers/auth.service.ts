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
  ) { }

  private _isLoggedIn = true;


  signIn(email: string, password: string) {
    this._isLoggedIn = true;
    this._reduxService.logIn(Object.assign({
      email: email,
      nameFirst: 'Steve',
      nameLast: 'Dz',
      countryDefault: COUNTRY.US,
      countries: COUNTRY
    }));
    const returnUrl = this._route.snapshot.queryParams['returnUrl'];
    if (returnUrl) {
      this._router.navigate([returnUrl]);
    } else {
      this._router.navigate([`/${this._reduxService.country}/dashboard`]);
    }
  }

  signOut() {
    this._isLoggedIn = false;
    this._reduxService.logOut();
    this._router.navigate(
      [`/${this._reduxService.country}/signin`],
      { queryParams: { returnUrl: this._reduxService.urlParams.join('/') } });
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
