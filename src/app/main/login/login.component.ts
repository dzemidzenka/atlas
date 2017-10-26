import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
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
export class LoginComponent implements OnDestroy {
    constructor(private _authService: AuthService, private _reduxService: ReduxService, private _loadingService: LoadingService) {}
    model = {
        username: '',
        password: ''
    };
    isLoading$ = this._loadingService.isLoading$;
    auth$Subscription: Subscription;

    logIn() {
        this._loadingService.on();
        this.auth$Subscription = this._authService.logIn(this.model.username, this.model.password).subscribe(
            response => {
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
        if (this.auth$Subscription) {
            this.auth$Subscription.unsubscribe();
        }
    }
}
