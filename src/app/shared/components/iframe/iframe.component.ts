import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReduxService } from '../../../providers/redux.service';
import { ACTION } from '../../../shared/models';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'atlas-iframe',
    templateUrl: './iframe.component.html',
    styleUrls: ['./iframe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IFrameComponent {
    constructor(private _reduxService: ReduxService, private _sanitizer: DomSanitizer) {}

    // loading$ = Observable.of(true).delay(20 * 1000);

    iFrameUrl$ = this._reduxService.state$
        .filter(state => state.action.op === ACTION.ROUTE)
        .filter(state => state.hasOwnProperty('menuItemCurrent'))
        .filter(state => state.menuItemCurrent.hasOwnProperty('iFrameUrl'))
        .filter(state => (state.menuItemCurrent.iFrameUrl ? true : false))
        .map(state => state.menuItemCurrent.iFrameUrl.replace('{{country}}', state.country))
        .map(iFrameUrl => this._sanitizer.bypassSecurityTrustResourceUrl(iFrameUrl));

    onLoad() {
        const iframe = document.getElementById('iframe1');
        // const doc = (<HTMLIFrameElement>iframe).contentDocument || (<HTMLIFrameElement>iframe).contentWindow.document;
        // const head = doc.getElementsByTagName('head')[0];
        // const style = doc.createElement('style');
        // style.type = 'text/css';
        // style.appendChild(document.createTextNode(`
        //   body { padding: 0!important;}
        //   #sidebar-nav-aside { display: none!important; }
        //   #navId { display: none!important; }
        //   .navbar { display: none!important; }
        //   .menu-container { display: none!important; }
        //   `));
        // head.appendChild(style);

        const win = (<HTMLIFrameElement>iframe).contentWindow as Window;
        win.postMessage('LOL', '*');
    }
}

// <script>
// window.addEventListener('message', event => processMessage(event), false);
// function processMessage(event){
//   console.log(event);
//   window.localStorage.setItem('ls.ID', JSON.stringify({'token': event.data}));
// }
// </script>
