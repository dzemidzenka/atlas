import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReduxService } from '../../providers/redux.service';
import { ACTION } from '../../models/models';

@Component({
  selector: 'atlas-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IFrameComponent {
  constructor(
    private _reduxService: ReduxService,
    private _sanitizer: DomSanitizer,
  ) { }


  state$ = this._reduxService.state$
    .filter(state => state.action.op === ACTION.ROUTE || state.action.op === ACTION.LANGUAGE || state.action.op === ACTION.COUNTRY)
    .map(state => Object.assign({
      url: this._sanitizer.bypassSecurityTrustResourceUrl(state.menuItemCurrent.iFrameUrl)
    }));


  // const iframe = document.getElementById('iframe1');
  // const doc = (<HTMLIFrameElement>iframe).contentDocument || (<HTMLIFrameElement>iframe).contentWindow.document;

  // // CRM
  // const navbar = <HTMLElement>doc.getElementsByClassName('navbar')[0];
  // if (navbar) {
  //   navbar.style.display = 'none';
  // }

  // const sidebar = <HTMLElement>doc.getElementById('sidebar-nav-aside');
  // if (sidebar) {
  //   sidebar.style.display = 'none';
  // }

  // // INTL
  // const intlMenu = <HTMLElement>doc.getElementById('navId');
  // if (intlMenu) {
  //   intlMenu.style.display = 'none';
  //   intlMenu.parentNode.removeChild(intlMenu);
  // }


  // // domestic
  // const menu = <HTMLElement>doc.getElementsByClassName('menu-container')[0];
  // if (menu) {
  //   menu.style.display = 'none';
  // }


  onLoad() {
    const iframe = document.getElementById('iframe1');
    const doc = (<HTMLIFrameElement>iframe).contentDocument || (<HTMLIFrameElement>iframe).contentWindow.document;
    const head = doc.getElementsByTagName('head')[0];

    const style = doc.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(`
      body { padding: 0!important;}
      #sidebar-nav-aside { display: none!important; }
      #navId { display: none!important; }
      .navbar { display: none!important; }
      .menu-container { display: none!important; }
      `));
    head.appendChild(style);
  }
}
