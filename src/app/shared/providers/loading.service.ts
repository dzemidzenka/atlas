import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingService {
    private _toggle$ = new BehaviorSubject<boolean>(false);

    isLoading$ = this._toggle$.asObservable();


    on() {
        this._toggle$.next(true);
    }

    off() {
        this._toggle$.next(false);
    }
}


// private _el: HTMLElement;

//     on() {
//         if (!this._el) {
//             this._el = document.getElementById('atlas-spinner');
//         }
//         this._el.style.display = 'flex';
//     }

//     off() {
//         if (!this._el) {
//             this._el = document.getElementById('atlas-spinner');
//         }
//         this._el.style.display = 'none';
//     }