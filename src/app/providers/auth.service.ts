import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReduxService } from './redux.service';
import { COUNTRY, IUserModel, INotificationModel } from '../models/models';

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
      nameDisplay: 'Steve D',
      countryDefault: COUNTRY.US,
      allowedCountries: COUNTRY
    }),
      [Object.assign(
        {
          message: 'Steve D logged in. Hello!',
          date: Date.now(),
        }
      )]
    );

  }

  private _isLoggedIn = false;


  logIn(email: string, password: string) {
    this._isLoggedIn = true;
    const user: IUserModel = {
      id: 1,
      email: email,
      nameFirst: 'Steve',
      nameLast: 'Dz',
      nameDisplay: 'Steve D',
      countryDefault: COUNTRY.US,
      allowedCountries: [...Object.keys(COUNTRY)]
    };
    const notification: INotificationModel = {
      message: `${user.nameDisplay} logged in. Hello!`,
      date: Date.now(),
    };
    this._reduxService.actionLogIn(user, [notification]);

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
