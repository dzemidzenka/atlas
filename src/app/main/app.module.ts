import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ToasterModule } from 'angular2-toaster';



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
import { TcodeComponent } from './tcode/tcode.component';
import { PathComponent } from './path/path.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TilesComponent } from './dashboard/tiles/tiles.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';




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
import { UserComponent } from './header/user/user.component';
import { ActionComponent } from './header/action/action.component';
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
    TilesComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    UserComponent,
    ActionComponent,
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
    ToasterModule,
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
  bootstrap: [AppComponent],
})
export class AppModule { }
