import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {
    private _toggleSubject$ = new Subject<boolean>();
    private _isLoading = false;

    isLoading$: Observable<boolean> = this._toggleSubject$.asObservable();

    toggle() {
        this._isLoading = !this._isLoading;
        this._toggleSubject$.next(this._isLoading);
    }

    on() {
        this._toggleSubject$.next(true);
    }

    off() {
        this._toggleSubject$.next(false);
    }
}
