import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject, isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ReduxService } from '../providers/redux.service';
import { LoadingService } from '../providers/loading.service';
import { ACTION, IStateModel } from '../shared/models';
import * as tokens from '../shared/constants';
import * as constants from '../shared/constants';
import { Options } from 'angular2-notifications';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        private _titleService: Title,
        private _reduxService: ReduxService,
        private _loadingService: LoadingService,
        @Inject(tokens.lsAUTH) private _lsAuth: string
    ) {}

    isLoading$ = this._loadingService.isLoading$;
    private readonly _title = 'Atlas Portal';
    private _state$Subscription: Subscription;
    private _timeout$Subscription: Subscription;
    private _logOutIfAnySessionLogsOut: Subscription;

    options: Options = {
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
            this._state$Subscription = this._reduxService.state$.subscribe(state => console.log('Redux state', state));
        }

        // logout all sessions if any one logs out
        this._logOutIfAnySessionLogsOut = Observable.fromEvent(window, 'storage')
            .filter((event: StorageEvent) => event.key === this._lsAuth)
            .filter((event: StorageEvent) => event.newValue === null)
            .do(() => this._reduxService.actionLogOut())
            .subscribe();

        // automatically logout after a period of inactivity
        this._timeout$Subscription = Observable.fromEvent(window, 'click')
            .merge(this._reduxService.state$) // trigger upon redux action too
            .auditTime(60 * 1000) // for performance reasons, react only to the last event within the audit time window
            .withLatestFrom(this._reduxService.state$)
            .map(array => array[1])
            .filter(state => state.isLoggedIn)
            .filter(
                state =>
                    !(state.hasOwnProperty('menuItemCurrent') && state.menuItemCurrent && state.menuItemCurrent.hasOwnProperty('iFrameUrl'))
            )
            // period of inactivity must be greater than auditTime
            .switchMap(state => Observable.of(state).delay(constants.MINUTES_OF_INACTIVITY * 60 * 1000))
            .do(() => this._reduxService.actionLogOut('Logged out due to inactivity. Goodbye!'))
            .subscribe();
    }

    ngOnDestroy() {
        if (this._state$Subscription) {
            this._state$Subscription.unsubscribe();
        }
        if (this._logOutIfAnySessionLogsOut) {
            this._logOutIfAnySessionLogsOut.unsubscribe();
        }
        if (this._timeout$Subscription) {
            this._timeout$Subscription.unsubscribe();
        }
    }
}
