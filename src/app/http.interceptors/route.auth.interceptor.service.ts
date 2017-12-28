import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface IRoutesAuth {
    path: string;
    allow: boolean | 'hidden';
}

const routesAuth: IRoutesAuth[] = [
    { path: 'domestic', allow: true }, 
    { path: 'domestic/releasing', allow: true }, 
    { path: 'domestic/releasing/sets', allow: 'hidden' }, 
    { path: 'domestic/releasing/summary', allow: false },
    { path: 'intl', allow: true }, 
    { path: 'intl/manage', allow: true }, 
    { path: 'intl/manage/intl-users-native', allow: false },
    { path: 'intl/manage/intl-customer_relationships', allow: true },
];
 
@Injectable()
export class RouteAuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url === 'api/mock/routeAuth') {
            const response = new HttpResponse<IRoutesAuth[]>({ 'body': routesAuth });
            return Observable.of(response);
        }
        return next.handle(request);
    }
}
