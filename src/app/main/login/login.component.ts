import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { ReduxService } from '../../providers/redux.service';
import { Subscription } from 'rxjs/Subscription';
import { INotificationModel } from '../../shared/models';

@Component({
    selector: 'atlas-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
    loading = { on: false };
    model = {
        username: '',
        password: ''
    };
    auth$Subscription: Subscription;

    constructor(private _authService: AuthService, private _reduxService: ReduxService) {}

    logIn() {
        this.loading = { on: true };
        this.auth$Subscription = this._authService.logIn(this.model.username, this.model.password).subscribe(
            response => {
                this.loading = { on: false };
            },
            error => {
                this.loading = { on: false };
                const notification: INotificationModel = {
                    message: error,
                    date: Date.now()
                };
                this._reduxService.actionNotify([notification]);
            }
        );
    }

    ngOnDestroy() {
        if (this.auth$Subscription) {
            this.auth$Subscription.unsubscribe();
        }
    }
}
