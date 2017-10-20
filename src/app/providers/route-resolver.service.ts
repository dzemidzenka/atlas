import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { ReduxService } from './redux.service';

@Injectable()
export class RouteResolverService implements Resolve<any> {
    constructor(private _reduxService: ReduxService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {}
}
