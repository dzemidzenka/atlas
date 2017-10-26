import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ReduxService } from '../providers/redux.service';
import { LoadingService } from '../providers/loading.service';
import { ACTION } from '../shared/models';
import * as tokens from '../shared/constants';
import * as constants from '../shared/constants';

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

    readonly title = 'Atlas Portal';
    isLoading$ = this._loadingService.isLoading$;
    state$Subscription: Subscription;
    timeout$Subscription: Subscription;
    localStorage$Subscription: Subscription;

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
        this._titleService.setTitle(this.title);

        // SUBSCRIBE TO REDUX STATE - nessesary to maintain at least one subscription active while the app is running
        this.state$Subscription = this._reduxService.state$.subscribe(state => {
            console.log('Redux state', state);
        });

        // logout all sessions if any one logs out
        this.localStorage$Subscription = Observable.fromEvent(window, 'storage')
            .filter((event: StorageEvent) => event.key === this._lsAuth)
            .filter((event: StorageEvent) => event.newValue === null)
            .do(() => this._reduxService.actionLogOut())
            .subscribe();

        // automatically logout after a period of inactivity
        this.timeout$Subscription = Observable.fromEvent(window, 'click')
            .merge(this._reduxService.state$) // trigger upon redux action too
            .auditTime(60 * 1000) // for performance reasons, react only to the last event within the time window
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

        // this.timeout$Subscription = Observable.interval(5 * 60 * 1000) // check every 5 minutes
        //     .withLatestFrom(this._reduxService.state$)
        //     .map(array => array[1])
        //     .filter(state => state.isLoggedIn)
        //     .filter(
        //         state =>
        //             !(state.hasOwnProperty('menuItemCurrent') && state.menuItemCurrent && state.menuItemCurrent.hasOwnProperty('iFrameUrl'))
        //     )
        //     .map(state => state.action.date)
        //     .filter(date => Math.floor(Date.now() / 1000) > date) // in seconds
        //     .do(() => this._reduxService.actionLogOut())
        //     .subscribe();
    }

    ngOnDestroy() {
        if (this.state$Subscription) {
            this.state$Subscription.unsubscribe();
        }
        if (this.localStorage$Subscription) {
            this.localStorage$Subscription.unsubscribe();
        }
        if (this.timeout$Subscription) {
            this.timeout$Subscription.unsubscribe();
        }
    }
}
