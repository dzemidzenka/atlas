import { Injectable } from '@angular/core';
import { IUserModel } from '../../main/app.service';
import isEmpty from 'lodash-es/isEmpty';

@Injectable()
export class LocalStorageService {
    readonly lsAuth = 'lsAUTH';
    readonly lsRememberMe = 'lsRememberMe';

    private _user: IUserModel;
    private _rememberMe: boolean;

    // USER
    get user(): IUserModel {
        if (!isEmpty(this._user)) {
            return this._user;
        }
        const _lsAuth = localStorage.getItem(this.lsAuth);
        if (_lsAuth) {
            return JSON.parse(_lsAuth);
        }
        return {} as IUserModel;
    }

    set user(user: IUserModel) {
        if (isEmpty(user)) {
            this._user = {} as IUserModel;
            localStorage.removeItem(this.lsAuth);
        } else {
            this._user = user;
            if (this._rememberMe) {
                localStorage.setItem(this.lsAuth, JSON.stringify(user));
            } else {
                const dummy = { 'loggedIn': true };    // so that auto logout of all sessions an react to window.storage event
                localStorage.setItem(this.lsAuth, JSON.stringify(dummy));
            }
        }
    }


    // REMEMBER ME
    get rememberMe(): boolean {
        if (this._rememberMe != undefined) {
            return this._rememberMe;
        }
        const _rememberMe = localStorage.getItem(this.lsRememberMe);
        if (_rememberMe) {
            return JSON.parse(_rememberMe).rememberMe;
        }
        return true;
    }

    set rememberMe(rememberMe: boolean) {
        this._rememberMe = rememberMe;
        localStorage.setItem(this.lsRememberMe, JSON.stringify({ rememberMe: rememberMe }));
    }
}
