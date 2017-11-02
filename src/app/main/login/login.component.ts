import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ReduxService } from '../../providers/redux.service';
import { LoadingService } from '../../providers/loading.service';
import { Subscription } from 'rxjs/Subscription';
import { INotificationModel } from '../../shared/models';

@Component({
    selector: 'atlas-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
    constructor(public _reduxService: ReduxService, private _loadingService: LoadingService) {}
    model = {
        username: '',
        password: '',
        rememberMe: false
    };
    isLoading$ = this._loadingService.isLoading$;
    logIn$Subscription: Subscription;

    ngOnInit() {
        const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
        if (rememberMe) {
            this.model.rememberMe = rememberMe.rememberMe;
        }
    }

    logIn() {
        this._loadingService.on();
        localStorage.setItem('rememberMe', JSON.stringify({ rememberMe: this.model.rememberMe }));

        this.logIn$Subscription = this._reduxService
            .actionLogIn(this.model.username, this.model.password, this.model.rememberMe)
            .subscribe(
                () => {
                    this._loadingService.off();
                },
                error => {
                    this._loadingService.off();
                    const notification: INotificationModel = {
                        message: error,
                        date: Date.now()
                    };
                    this._reduxService.actionNotify([notification]);
                }
            );
    }

    ngOnDestroy() {
        if (this.logIn$Subscription) {
            this.logIn$Subscription.unsubscribe();
        }
    }
}
