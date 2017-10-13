import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReduxService } from './redux.service';
import { COUNTRY, LANGUAGE, IUserModel, INotificationModel } from '../models/models';


@Injectable()
export class AuthService {
  constructor(
    private _reduxService: ReduxService,
    private _http: HttpClient,
  ) {
    // this._isLoggedIn = true;
    // this._reduxService.actionLogIn(Object.assign({
    //   email: 'test@company.com',
    //   nameFirst: 'Steve',
    //   nameLast: 'Dz',
    //   nameDisplay: 'Steve D',
    //   countryDefault: COUNTRY.US,
    //   allowedCountries: [...Object.values(COUNTRY)],
    //   defaultLanguage: LANGUAGE.EN,
    // }),
    //   [Object.assign(
    //     {
    //       message: 'Steve D logged in. Hello!',
    //       date: Date.now(),
    //     }
    //   )]
    // );
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
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });



    xhr.open('POST', '/api/token');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'OPTIONS');
    // xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    // xhr.send(data);


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
    this._logIn(email, password);
    this._isLoggedIn = true;
    const user: IUserModel = {
      id: 1,
      email: email,
      nameFirst: 'Steve',
      nameLast: 'Dz',
      nameDisplay: 'Steve D',
      countryDefault: COUNTRY.US,
      allowedCountries: [...Object.values(COUNTRY)],
      languageDefault: LANGUAGE.EN,
    };


    const notification: INotificationModel = {
      message: `${user.nameDisplay} logged in. Hello!`,
      date: Date.now(),
    };
    this._reduxService.actionLogIn(user, [notification]);
  }


  logOut() {
    this._isLoggedIn = false;
    this._reduxService.actionLogOut();
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
