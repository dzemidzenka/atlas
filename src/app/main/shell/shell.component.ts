import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { ReduxService } from '../../providers/redux.service';
import { VIEW } from '../../models/models';

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
  selector: 'atlas-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  constructor(
    private _authService: AuthService,
    private _reduxService: ReduxService,
    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
  ) {
    const isBp = this.bpService.getByName('is');
    // this.menuClick$ = this.menuService.onItemSelect()
    //   .withLatestFrom(this.themeService.onMediaQueryChange())
    //   .delay(20)
    //   .do(p => console.log('LOLol', p))
    //   .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

    //     if (bpTo.width <= isBp.width) {
    //       this.sidebarService.collapse('menu-sidebar');
    //     }
    //   });

    this.menuClick$ = this.menuService.onItemClick()
      .subscribe(menuItem => {
        this._reduxService.navigateToDashboard(menuItem.item.target as VIEW);
      });
  }


  state$ = this._reduxService.state$.map(state => Object.assign({
    country: state.country,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    notifications: state.notifications
  }));



  menu = MENU_ITEMS;
  layout: any = {};
  sidebar: any = {};



  protected layoutState$: Subscription;
  protected sidebarState$: Subscription;
  protected menuClick$: Subscription;
}
