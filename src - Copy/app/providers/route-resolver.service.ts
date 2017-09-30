
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class RouteResolverService implements Resolve<void> {
  constructor() { }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) { }
}
