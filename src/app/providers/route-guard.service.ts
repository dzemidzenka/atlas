import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReduxService } from './redux.service';

@Injectable()
export class RouteGuardService implements CanActivate {
    constructor(private _router: Router, private _reduxService: ReduxService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._reduxService.getCurrentState().isLoggedIn) {
            return true;
        }

        // const urlTree = this._router.parseUrl(state.url);
        // const urlParams = state.url
        //     .split('/')
        //     .filter(param => param !== '')
        //     .map(param => param.split('?')[0]);
        // const queryParams = urlTree.queryParams;
        // queryParams.returnUrl = urlParams.join('/');

        // this._router.navigate(['login'], { queryParams: { ...queryParams } });

        this._reduxService.actionLogOut();
        return false;
    }
}
