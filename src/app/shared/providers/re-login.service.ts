import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ReLoginService {
  private _retry$ = new Subject<any>();
  retry$ = this._retry$.asObservable();

  retry() {
    this._retry$.next();
  }
}
