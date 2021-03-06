import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from '@main/app.service';
import { LoadingService } from '@shared/providers/loading.service';
import { map } from "rxjs/operators/map";
import { filter } from "rxjs/operators/filter";

@Component({
    selector: 'atlas-iframe',
    templateUrl: './iframe.component.html',
    styleUrls: ['./iframe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IFrameComponent {
    constructor(
        private _appService: AppService,
        private _sanitizer: DomSanitizer,
        private _loadingService: LoadingService
    ) { }


    iFrameUrl$ = this._appService.state$.pipe(
        filter(state => state.hasOwnProperty('menuItemCurrent')),
        filter(state => state.menuItemCurrent.hasOwnProperty('iFrameUrl')),
        filter(state => (state.menuItemCurrent.iFrameUrl ? true : false)),
        map(state => state.menuItemCurrent.iFrameUrl.replace('{{country}}', state.country)),
        map(iFrameUrl => this._sanitizer.bypassSecurityTrustResourceUrl(iFrameUrl)));



    onLoad() {
        this._loadingService.off();

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
