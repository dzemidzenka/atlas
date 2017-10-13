import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ReduxService } from '../providers/redux.service';
import { MatDrawer } from '@angular/material/sidenav';


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
  ) { }

  readonly title = 'Atlas';

  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'flyRight',
    limit: 5,
    showCloseButton: true
  });


  @ViewChild('sidenav') sidenav: MatDrawer;

  state$ = this._reduxService.state$.map(state => Object.assign({
    country: state.country,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    notifications: state.notifications
  }));


  onSidebarToggle() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    this._titleService.setTitle(this.title);
  }
}
