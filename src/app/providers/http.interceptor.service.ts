import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../shared/providers/local-storage.service';
import { ReLoginService } from '../shared/providers/re-login.service';
import { ReLoginComponent } from '../main/login/re-login/re-login.component';
import { MatDialog } from '@angular/material';
import { NotificationService } from '../shared/providers/notification.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
      private _localStorageService: LocalStorageService,
      private _reLoginService: ReLoginService,
      private _dialog: MatDialog,
      private _notificationsService: NotificationService,
    ) {}
    private _count = 1;

    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url === environment.logInUrl) {
            return next.handle(request);
        }

        const user = this._localStorageService.user;
        if (user) {
            // const _request = request.clone({
            //     headers: request.headers.set('Authorization', (this._count === 3) ? `Bearer ${user.accessToken + 1}` : `Bearer ${user.accessToken}`)
            // });
            const _request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${user.accessToken}`)
            });
            this._count += 1;

            return Observable.merge(next.handle(_request), this._reLoginService.retry$.switchMap(() => next.handle(_request))).do(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // do stuff with response if you want
                    }
                },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this._notificationsService.notifySingle(`${err.status}  ${err.error.Message}`);
                      
                        if (err.status === 401) {
                            // const dialogRef = this._dialog.open(ReLoginComponent, {
                            //     width: '500px',
                            //     height: '300px',
                            //     // disableClose: true
                            // });
                            // dialogRef.afterClosed().subscribe(result => {
                            //     console.log('The dialog was closed', result);
                            // });
                        } else {
                          // this._notificationsService.notify([{ message: err }]);                          
                        }
                    }
                }
            );
        }

        return next.handle(request);
    }
}
