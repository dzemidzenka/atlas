import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../main/app.service';
import { LocalStorageService } from '../shared/providers/local-storage.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-root',
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
    private _state$Subscription: Subscription;
    private _timeout$Subscription: Subscription;
    private _logOutIfAnySessionLogsOut: Subscription;

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
            this._state$Subscription = this._appService.state$.subscribe(state => console.log('App state', state));
        }

        // logout all sessions if any one logs out
        this._logOutIfAnySessionLogsOut = Observable.fromEvent(window, 'storage')
            .filter((event: {}) => (<StorageEvent>event).key === this._localStorageService.lsAuth)
            .filter((event: {}) => (<StorageEvent>event).newValue === null)
            .do(() => this._appService.actionLogOut())
            .subscribe();


        // automatically logout after a period of inactivity
        this._timeout$Subscription = Observable.fromEvent(window, 'click')
            .merge(this._appService.state$) // trigger upon redux action too
            .auditTime(60 * 1000) // for performance reasons, react only to the last event within the audit time window
            .withLatestFrom(this._appService.state$)
            .map(array => array[1])
            .filter(state => state.isLoggedIn)
            .filter(
            state =>
                !(state.hasOwnProperty('menuItemCurrent') && state.menuItemCurrent && state.menuItemCurrent.hasOwnProperty('iFrameUrl'))
            )
            // period of inactivity must be greater than auditTime
            .switchMap(state => Observable.of(state).delay(environment.MINUTES_OF_INACTIVITY * 60 * 1000))
            .do(() => this._appService.actionLogOut())
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
