import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {
    private _toggleSubject$ = new Subject<boolean>();

    isLoading$ = this._toggleSubject$.asObservable().startWith(false);

    on() {
        this._toggleSubject$.next(true);
    }

    off() {
        this._toggleSubject$.next(false);
    }
}
