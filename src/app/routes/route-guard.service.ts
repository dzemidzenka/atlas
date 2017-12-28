import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { NotificationService } from '@shared/providers/notification.service';
import { AppService } from '@main/app.service';

@Injectable()
export class RouteGuardService implements CanActivate {
        constructor(
                // private _notificationsService: NotificationService,
                // private _router: Router,
                private _appService: AppService,
        ) { }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
                if (route.routeConfig && route.routeConfig.data && route.routeConfig.data.notAuthorized) {
                        // this._notificationsService.notifySingle(`Not authorized for ${state.url}`);
                        // this._router.navigateByUrl(`not-authorized?from=${state.url}`);
                        this._appService.actionNotAuthorized(state.url);
                        return false;
                }
                else {
                        return true;
                }
        }
}