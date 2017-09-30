import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RouteGuardService implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    }
    if (state.url.length > 1) {
      this._router.navigate([`/${route.params.country}/signin`], { queryParams: { returnUrl: state.url } });
    } else {
      this._router.navigate([`/${route.params.country}/signin`]);
    }
    return false;
  }
}
