import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { CovalentNotificationsModule } from '@covalent/core';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../@theme/theme.module';


// RxJs operators
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

// providers
import * as tokens from '../providers/tokens';
import { ReduxService } from '../providers/redux.service';
import { AuthService } from '../providers/auth.service';
import { RouteGuardService } from '../providers/route-guard.service';
import { RouteResolverService } from '../providers/route-resolver.service';

// routes
import { ROUTES } from '../routes/app.routes';

// components (non-lazy)
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { TcodeComponent } from './tcode/tcode.component';
import { PathComponent } from './path/path.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StickynotesComponent } from './dashboard/stickynotes/stickynotes.component';
import { TilesComponent } from './dashboard/tiles/tiles.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

import { ShellMdComponent } from './shell/md/shell.component';
import { HeaderMdComponent } from './header/md/header.component';




//  INJECTION TOKENS
const TOKEN_PROVIDERS = [
  {
    provide: tokens.LOCAL_STORAGE_NAME_PROVIDER,
    useValue: 'atlas_state'
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
    ShellComponent,
    TcodeComponent,
    PathComponent,
    DashboardComponent,
    StickynotesComponent,
    TilesComponent,
    LoginComponent,
    HeaderComponent,

    ShellMdComponent,
    HeaderMdComponent,
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
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ThemeModule.forRoot(),
    ToasterModule,
    CovalentNotificationsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ...TOKEN_PROVIDERS,
    ReduxService,
    AuthService,
    RouteGuardService,
    RouteResolverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
