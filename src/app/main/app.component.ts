import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReduxService } from '../providers/redux.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private _titleService: Title, private _reduxService: ReduxService) {}

    readonly title = 'Atlas';
    @ViewChild('sidenav') sidenav: MatDrawer;
    state$Subscription: Subscription;
    timeout$Subscription: Subscription;

    options = {
        position: ['top', 'right'],
        timeOut: 3000,
        lastOnBottom: false,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 5,
        showProgressBar: true
    };


    state$ = this._reduxService.state$.map(state =>
        Object.assign({
            country: state.country,
            isLoggedIn: state.isLoggedIn,
            user: state.user,
            notifications: state.notifications
        })
    );

    onSidebarToggle() {
        this.sidenav.toggle();
    }

    ngOnInit() {
        this._titleService.setTitle(this.title);

        // SUBSCRIBE TO REDUX STATE - nessesary to maintain at least one subscription active while the app is running
        this.state$Subscription = this._reduxService.state$.subscribe(state => {
            console.log('Redux state', state);
        });

        // automatically logout after a period of inactivity
        this.timeout$Subscription = Observable.interval(5 * 60 * 1000) // check every 5 minutes
            .withLatestFrom(this._reduxService.state$)
            .map(array => array[1])
            .filter(state => state.isLoggedIn)
            .filter(
                state =>
                    !(state.hasOwnProperty('menuItemCurrent') && state.menuItemCurrent && state.menuItemCurrent.hasOwnProperty('iFrameUrl'))
            )
            .map(state => state.action.date)
            .filter(date => Math.floor(Date.now() / 1000) > date) // in seconds
            .do(() => this._reduxService.actionLogOut())
            .subscribe();
    }

    ngOnDestroy() {
        this.state$Subscription.unsubscribe();
        this.timeout$Subscription.unsubscribe();
    }
}
