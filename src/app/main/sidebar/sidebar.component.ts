import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { ReduxService } from '../../providers/redux.service';
// import { ACTION, COUNTRY, LANGUAGE } from '../../models/models';
// import { MENU_ITEMS } from './menu';

@Component({
  selector: 'atlas-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  constructor(
    // private _reduxService: ReduxService,
  ) { }

  // menu = MENU_ITEMS;
}
