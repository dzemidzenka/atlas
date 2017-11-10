import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReduxService } from '../../providers/redux.service';
import { LoadingService } from '../../shared/providers/loading.service';
import { LocalStorageService } from '../../shared/providers/local-storage.service';
import { NotificationService } from '../../shared/providers/notification.service';
import { ReLoginService } from '../../shared/providers/re-login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'atlas-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
    constructor(
        protected _reduxService: ReduxService,
        private _loadingService: LoadingService,
        private _localStorageService: LocalStorageService,
        private _notificationService: NotificationService,
        private _reLoginService: ReLoginService
    ) {}

    logInForm = new FormGroup(
        {
            userName: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            rememberMe: new FormControl(this._localStorageService.rememberMe)
        },
        {
            updateOn: 'submit'
        }
    );

    isLoading$ = this._loadingService.isLoading$;
    private _logIn$Subscription: Subscription;


    logIn() {
        if (!this.logInForm.valid) {
            return;
        }

        this._loadingService.on();
        this._localStorageService.rememberMe = this.logInForm.value.rememberMe;
        if (this.logInForm.value.userName) {
            if (this.logInForm.value.userName.includes('@')) {
                this.logInForm.value.userName = this.logInForm.value.userName.split('@')[0]; // if email is entered, just grab username
            }
        } else {
            if (this._reduxService.currentState.user) {
                this.logInForm.value.userName = this._reduxService.currentState.user.userName;
            }
        }

        this._logIn$Subscription = this._reduxService
            .actionLogIn(this.logInForm.value.userName, this.logInForm.value.password, this.logInForm.value.rememberMe)
            .subscribe(
                () => {
                    this._loadingService.off();
                    this._reLoginService.retry();
                },
                error => {
                    this._loadingService.off();
                    // this._notificationService.notify([{ message: error }]);
                }
            );
    }

    ngOnDestroy() {
        if (this._logIn$Subscription) {
            this._logIn$Subscription.unsubscribe();
        }
    }
}
