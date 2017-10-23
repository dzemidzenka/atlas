import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

// providers
import * as tokens from '../shared/constants';
import { ReduxService } from '../providers/redux.service';
import { AuthService } from '../providers/auth.service';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';
import { AuthInterceptor } from '../providers/http.interceptor.service';

// routes
import { ROUTES } from '../routes/app.routes';

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
import { AppsSelectorComponent } from './shell/header/apps-selector/apps-selector.component';

//  INJECTION TOKENS
const TOKEN_PROVIDERS = [
    {
        provide: tokens.lsAUTH,
        useValue: 'ls.IdentityData'
    }
];

// translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
        AppsSelectorComponent,
        ShellComponent
    ],
    imports: [
        SharedModule,
        BrowserAnimationsModule,
        // NoopAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES),
        // BrowserModule,
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
        ReduxService,
        AuthService,
        RouteGuardService,
        RouteResolverService,
        [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
