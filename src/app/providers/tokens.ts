import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE_NAME_PROVIDER = new InjectionToken<string>('localStorageName');


const LOCAL_STORAGE_NAME = 'atlas_state';


export const TOKEN_PROVIDERS = [
    {
        provide: LOCAL_STORAGE_NAME_PROVIDER,
        useValue: LOCAL_STORAGE_NAME
    }
];
