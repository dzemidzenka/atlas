import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ReduxService } from './redux.service';
import { COUNTRY, LANGUAGE, IUserModel, INotificationModel } from '../models/models';


@Injectable()
export class AuthService {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _reduxService: ReduxService,
    private _http: Http,
  ) {
    this._isLoggedIn = true;
    // this._logIn('', '');

    this._reduxService.actionLogIn(Object.assign({
      email: 'test@company.com',
      nameFirst: 'Steve',
      nameLast: 'Dz',
      nameDisplay: 'Steve D',
      countryDefault: COUNTRY.US,
      allowedCountries: [...Object.values(COUNTRY)],
      defaultLanguage: LANGUAGE.EN,
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




  _logIn(username: string, password: string) {
    const data = {
      'client_id': 'atlaswebapp',
      'grant_type': 'token',
      'password': password,
      'username': username
    };

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function (e) {
      console.log(e);
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open('POST', 'http://atlasglobal-dev.nuvasive.com/api/token');
    xhr.send(data);


    // return this._http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
    //   .map((response: Response) => {
    //     // login successful if there's a jwt token in the response
    //     const user = response.json();
    //     console.log(response.json());
    //     if (user && user.token) {
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       // localStorage.setItem('currentUser', JSON.stringify(user));
    //     }

    //     return user;
    //   });
  }



  logIn(email: string, password: string) {
    this._isLoggedIn = true;
    const user: IUserModel = {
      id: 1,
      email: email,
      nameFirst: 'Steve',
      nameLast: 'Dz',
      nameDisplay: 'Steve D',
      countryDefault: COUNTRY.US,
      allowedCountries: [...Object.values(COUNTRY)],
      defaultLanguage: LANGUAGE.EN,
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
        [`/${country}/login`],
        { queryParams: { returnUrl: urlParams.join('/'), ...queryParams } });
    } else {
      this._router.navigate([`/${country}/login`]);
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
