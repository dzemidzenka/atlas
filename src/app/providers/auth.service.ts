import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ReduxService } from './redux.service';
import { COUNTRY, LANGUAGE, IUserModel } from '../shared/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    constructor(private _reduxService: ReduxService, private _http: HttpClient) {}

    logIn(username: string, password: string): Observable<IUserModel> {
        const data = `grant_type=password&username=${username}&password=${password}&client_id=atlaswebapp`;
        const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        return (
            this._http
                .post('http://atlasglobal-dev.nuvasive.com/api/token', data)
                // .switchMap(response => {
                //   console.log('response["ok"]', response['ok']);
                //   return Observable.throw(new Error(JSON.parse(response['error'])['error_description']));
                //   // return response['ok'] ?
                //   //   Observable.of(response) : Observable.throw(new Error(JSON.parse(response['error'])['error_description']));
                // })
                .map(this._userFromAuthResponse)
                .do(user => this._reduxService.actionLogIn(user))
                .catch((errorResponse: HttpErrorResponse) => {
                    console.log('HTTP AUTH ERROR', errorResponse);
                    if (errorResponse.ok) {
                        return Observable.throw(JSON.parse(errorResponse['error'])['error_description']);
                    } else {
                        return Observable.throw(errorResponse.message);
                    }
                })
        );
    }

    logOut() {
        this._reduxService.actionLogOut();
    }

    isLoggedIn(): boolean {
        return this._reduxService.getCurrentState() ? this._reduxService.getCurrentState().isLoggedIn : false;
    }

    private _userFromAuthResponse(response: Response): IUserModel {
        const allowedCountries = response['as:tenantContextHosts'].split(', ').map(country =>
            country
                .trim()
                .slice(0, 2)
                .toLowerCase()
        );

        const user: IUserModel = {
            userName: response['userName'],
            phone: response['as:claim:http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'],
            nameDisplay: response['as:claim:http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
            countryDefault: response['as:claim:http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country'].toLowerCase(),
            allowedCountries: [...allowedCountries],
            languageDefault: LANGUAGE.EN,
            expires: Math.floor(Date.now() / 1000) + response['expires_in'],
            access_token: response['access_token']
        };
        return user;
    }
}
