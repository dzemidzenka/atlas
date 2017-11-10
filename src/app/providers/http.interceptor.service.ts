import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../shared/providers/local-storage.service';
import { ReLoginService } from '../shared/providers/re-login.service';
import { NotificationService } from '../shared/providers/notification.service';
import { environment } from '../../environments/environment';
import { LoadingService } from '../shared/providers/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _localStorageService: LocalStorageService,
        private _reLoginService: ReLoginService,
        private _notificationsService: NotificationService,
        private _loadingService: LoadingService,
    ) { }
    // private _count = 1;

    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let _request;
        debugger;
        if (request.url === environment.logInUrl) {
            _request = request.clone();
        } else {
            const user = this._localStorageService.user;
            if (user) {
                // const _request = request.clone({
                //     headers: request.headers.set('Authorization', (this._count === 3) ? `Bearer ${user.accessToken + 1}` : `Bearer ${user.accessToken}`)
                // });
                _request = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${user.accessToken}`)
                });
                // this._count += 1;
            } else {
                _request = request.clone();
            }
        }

        return Observable.merge(next.handle(_request), this._reLoginService.retry$.switchMap(() => next.handle(_request))).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) { }
            },
            (err: HttpErrorResponse) => {
                // if (err instanceof HttpErrorResponse) {
                if (err.error.Message) {
                    this._notificationsService.notifySingle(`${err.status}  ${err.error.Message}`);
                }

                let message: string;
                if (err.status === 401) {
                    message = 'Not authorized';
                } else
                // if (err.status === 503) 
                {
                    message = 'Atlas backend is down';
                }
                this._notificationsService.notifySingle(message);
                this._loadingService.off();
            }
            // }
        );
    }
}
