import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '@shared/providers/local-storage.service';
// import { ReLoginService } from '@shared/providers/re-login.service';
import { NotificationService } from '@shared/providers/notification.service';
import { LoadingService } from '@shared/providers/loading.service';
import { environment } from '@env';
import { catchError } from "rxjs/operators/catchError";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _localStorageService: LocalStorageService,
        // private _reLoginService: ReLoginService,
        private _notificationsService: NotificationService,
        private _loadingService: LoadingService,
    ) { }

    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let _request: HttpRequest<any>;
        if (request.url === environment.logInUrl) {
            _request = request.clone();
        } else {
            const user = this._localStorageService.user;
            if (user) {
                _request = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${user.accessToken}`)
                });
            } else {
                _request = request.clone();
            }
        }

        return next.handle(_request).pipe(catchError((err: HttpErrorResponse) => {
            if (err.error && err.error.Message) {
                this._notificationsService.notifySingle(`${err.status}  ${err.error.Message}`);
            }

            let message: string;
            switch (err.status) {
                case 401:
                    message = 'Not authorized';
                    break;
                case 404:
                    message = 'No data found';
                    break;
                default:
                    message = 'Atlas backend is down';
            }
            this._notificationsService.notifySingle(message);
            this._loadingService.off();
            return Observable.of({} as HttpEvent<{}>);
        }));
    }
}
