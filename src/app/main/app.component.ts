import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReduxService } from '../providers/redux.service';
// import { TranslateService } from '@ngx-translate/core';

import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';
import isEmpty from 'lodash-es/isEmpty';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private _titleService: Title,
    private _reduxService: ReduxService,
    // private _translate: TranslateService,

    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
  ) {

    // this._translate.setDefaultLang('en');
    // this._translate.use('en');
    // this._translate.get('HELLO', { value: 'world' }).subscribe((res: string) => {
    //   console.log(res);
    // });

    const isBp = this.bpService.getByName('is');
    this.menuClick$ = this.menuService.onItemSelect()
      .withLatestFrom(this.themeService.onMediaQueryChange())
      .delay(20)
      .do(p => console.log('LOLol', p))
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        // if (bpTo.width <= isBp.width) {
        this.sidebarService.collapse('menu-sidebar');
        // }
        // this._router.navigate(['', { outlets: { pages: 'us/atlas' } }]);
        // this._router.navigateByUrl('us/atlas)');
      });

  }

  readonly title: string = 'Atlas';

  // state$ = this._reduxService.state$.map(state => state.isComponent);
  state$ = this._reduxService.state$.map(state => Object.assign({
    country: state.country,
    isLoggedIn: !isEmpty(state.user),
    user: state.user,
    notifications: state.notifications
  }));


  menu = MENU_ITEMS;
  layout: any = {};
  sidebar: any = {};

  protected layoutState$: Subscription;
  protected sidebarState$: Subscription;
  protected menuClick$: Subscription;



  ngOnInit() {
    this.sidebarService.collapse('menu-sidebar');
    this._titleService.setTitle(this.title);
  }
}
