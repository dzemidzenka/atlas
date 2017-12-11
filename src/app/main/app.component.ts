import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppService } from '@main/app.service';
import { LocalStorageService } from '@shared/providers/local-storage.service';
import { environment } from '@env';
import { map } from "rxjs/operators/map";
import { filter } from "rxjs/operators/filter";
import { tap } from "rxjs/operators/tap";
import { takeUntil } from "rxjs/operators/takeUntil";
import { merge } from "rxjs/operators/merge";
import { auditTime } from "rxjs/operators/auditTime";
import { withLatestFrom } from "rxjs/operators/withLatestFrom";
import { switchMap } from "rxjs/operators/switchMap";
import { delay } from "rxjs/operators/delay";


@Component({
    selector: 'atlas-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        private _titleService: Title,
        private _appService: AppService,
        private _localStorageService: LocalStorageService,
    ) { }

    private readonly _title = 'Atlas Portal';
    private _destroyed$ = new Subject();

    options = {
        position: ['top', 'right'],
        timeOut: 3000,
        lastOnBottom: false,
        pauseOnHover: true,
        clickToClose: true,
        showProgressBar: true,
        animate: 'scale'
    };


    ngOnInit() {
        this._titleService.setTitle(this._title);

        if (isDevMode) {
            this._appService.state$
                .pipe(takeUntil(this._destroyed$))
                .subscribe(state => console.log('App state', state));
        }

        // logout all sessions if any one logs out
        Observable.fromEvent(window, 'storage').pipe(
            filter((event: {}) => (<StorageEvent>event).key === this._localStorageService.lsAuth),
            filter((event: {}) => (<StorageEvent>event).newValue === null),
            tap(() => this._appService.actionLogOut()),
            takeUntil(this._destroyed$))
            .subscribe();


        // automatically logout after a period of inactivity
        Observable.fromEvent(window, 'click').pipe(
            merge(this._appService.state$), // trigger upon redux action too
            auditTime(60 * 1000), // for performance reasons, react only to the last event within the audit time window
            withLatestFrom(this._appService.state$),
            map(array => array[1]),
            filter(state => state.isLoggedIn),
            filter(state => !(state.hasOwnProperty('menuItemCurrent') && state.menuItemCurrent && state.menuItemCurrent.hasOwnProperty('iFrameUrl'))),
            // period of inactivity must be greater than auditTime
            switchMap(state => Observable.of(state).pipe(delay(environment.MINUTES_OF_INACTIVITY * 60 * 1000))),
            tap(() => this._appService.actionLogOut()),
            takeUntil(this._destroyed$))
            .subscribe();
    }

    ngOnDestroy() {
        this._destroyed$.next();
    }
}
