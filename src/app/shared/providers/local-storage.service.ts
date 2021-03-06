import { Injectable } from '@angular/core';
import { IUser } from '@main/app.service';

@Injectable()
export class LocalStorageService {
    readonly lsAuth = 'lsAUTH';
    readonly lsRememberMe = 'lsRememberMe';

    private _user: IUser | null;
    private _rememberMe: boolean;

    // USER
    get user(): IUser {
        if (this._user) {
            return this._user;
        }
        const _lsAuth = localStorage.getItem(this.lsAuth);
        if (_lsAuth) {
            return JSON.parse(_lsAuth);
        }
        return {} as IUser;
    }

    set user(user: IUser) {
        if (Object.keys(user).length === 0) {
            this._user = null;
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
        if (this._rememberMe !== undefined) {
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
