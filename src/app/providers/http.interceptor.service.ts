import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const clonedRequest = req.clone({
    //   headers: req.headers.set('X-CustomAuthHeader', authService.getToken())
    // });
    // console.log('new headers', clonedRequest.headers.keys());
    // return next.handle(clonedRequest);
    console.log(req);

    const identityData = {
      userName: 'AuthInterceptor'
    };
    localStorage.setItem('TEST', JSON.stringify(identityData));

    return next.handle(req);
  }
}
