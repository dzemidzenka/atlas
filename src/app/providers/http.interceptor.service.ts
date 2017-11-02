import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as tokens from '../shared/constants';
import * as models from '../shared/models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(@Inject(tokens.lsAUTH) private _lsAuth: string) {}

    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user: models.IUserModel = JSON.parse(localStorage.getItem(this._lsAuth));
        let _request;
        if (user) {
            _request = request.clone({
                // // setHeaders: { Authorization: `Bearer ${this._reduxService.getCurrentState().user.access_token}` }
                // // setHeaders: { Authorization: `Bearer ${user.access_token}` }
                // //  headers: req.headers.set('X-CustomAuthHeader', authService.getToken())
                headers: request.headers.set('Authorization', `Bearer ${user.access_token}`)
            });
            return next.handle(_request).do(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // do stuff with response if you want
                    }
                },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            console.log('LOL');

                            // redirect to the login route
                            // or show a modal
                        }
                    }
                }
            );
        } else {
            return next.handle(request);
        }
    }
}
