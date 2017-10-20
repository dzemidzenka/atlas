import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RouteGuardService implements CanActivate {
    constructor(private _router: Router, private _authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._authService.isLoggedIn()) {
            return true;
        }

        const urlTree = this._router.parseUrl(state.url);
        const urlParams = state.url
            .split('/')
            .filter(param => param !== '')
            .map(param => param.split('?')[0]);
        const queryParams = urlTree.queryParams;
        queryParams.returnUrl = urlParams.join('/');

        this._router.navigate(['login'], { queryParams: { ...queryParams } });
        return false;
    }
}
