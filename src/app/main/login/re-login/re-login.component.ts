import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { LoginComponent } from '../login.component';
import { ReduxService } from '../../../providers/redux.service';
import { LoadingService } from '../../../providers/loading.service';
import { Observable } from 'rxjs/Observable';
import { ACTION, IStateModel } from '../../../shared/models';
import { MINUTES_OF_BEFORE_RELOGIN } from '../../../shared/constants';

@Component({
    selector: 'atlas-re-login',
    templateUrl: './re-login.component.html',
    styleUrls: ['./re-login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReLoginComponent extends LoginComponent {
    constructor(_reduxService: ReduxService, _loadingService: LoadingService) {
        super(_reduxService, _loadingService);
    }

    reLoginPrompt$ = this._reduxService.state$.switchMap((state: IStateModel) => {
        if (!state.isLoggedIn) {
            return Observable.of(false);
        }
        if (state.action.type === ACTION.LOGIN) {
            return Observable.of(false);
        } else {
            return Observable.of(true).delay((state.user.expires - state.action.date) * 1000);
        }
    });

    timeToSessionExpiration$ = Observable.interval(1000)
        .map(second => second * 100 / (MINUTES_OF_BEFORE_RELOGIN * 60))
        .take(MINUTES_OF_BEFORE_RELOGIN * 60);

    logOut() {
        this._reduxService.actionLogOut();
    }
}
