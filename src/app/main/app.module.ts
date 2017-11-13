import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';

// providers
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';
import { AuthInterceptor } from '../providers/http.interceptor.service';

//  INJECTION TOKENS
const TOKEN_PROVIDERS = [
    // {
    //     provide: tokens.lsAUTH,
    //     useValue: 'ls.IdentityData'
    // }
];

// routes
import { ROUTES } from '../routes/app.routes';

// translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// components
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './shell/sidebar/sidebar.component';
import { HeaderComponent } from './shell/header/header.component';
import { TcodeComponent } from './shell/tcode/tcode.component';
import { PathComponent } from './shell/path/path.component';
import { NotificationCountComponent } from './shell/header/notification-count/notification-count.component';
import { UserComponent } from './shell/header/user/user.component';
import { ActionComponent } from './shell/header/action/action.component';
import { CountrySelectorComponent } from './shell/header/country-selector/country-selector.component';
import { LanguageSelectorComponent } from './shell/header/language-selector/language-selector.component';
import { AppSelectorComponent } from './shell/header/app-selector/app-selector.component';
import { CountryListComponent } from './shell/header/country-list/country-list.component';
import { AppListComponent } from './shell/header/app-list/app-list.component';
import { UserMenuComponent } from './shell/header/user-menu/user-menu.component';
import { LanguageListComponent } from './shell/header/language-list/language-list.component';
import { NotificationListComponent } from './shell/header/notification-list/notification-list.component';
import { ReLoginComponent } from './login/re-login/re-login.component';

@NgModule({
    declarations: [
        AppComponent,
        TcodeComponent,
        PathComponent,
        DashboardComponent,
        LoginComponent,
        HeaderComponent,
        SidebarComponent,
        UserComponent,
        ActionComponent,
        CountrySelectorComponent,
        LanguageSelectorComponent,
        NotificationCountComponent,
        AppSelectorComponent,
        ShellComponent,
        CountryListComponent,
        AppListComponent,
        UserMenuComponent,
        LanguageListComponent,
        NotificationListComponent,
        ReLoginComponent
    ],
    imports: [
        environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
        SharedModule.forRoot(),
        BrowserAnimationsModule,
        // NoopAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        SimpleNotificationsModule.forRoot()
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        ...TOKEN_PROVIDERS,
        RouteGuardService,
        RouteResolverService,
        [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
    ],
    entryComponents: [
        CountryListComponent,
        AppListComponent,
        UserMenuComponent,
        LanguageListComponent,
        NotificationListComponent,
        ReLoginComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
