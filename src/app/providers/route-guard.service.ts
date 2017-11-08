import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReduxService } from './redux.service';

@Injectable()
export class RouteGuardService implements CanActivate {
    constructor(
        private _router: Router,
        private _reduxService: ReduxService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._reduxService.currentState.isLoggedIn) {
            return true;
        }

        this._reduxService.actionLogOut();
        return true;
    }
}
