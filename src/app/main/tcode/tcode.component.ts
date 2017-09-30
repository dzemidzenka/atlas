import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReduxService } from '../../providers/redux.service';

@Component({
  selector: 'atlas-tcode',
  templateUrl: './tcode.component.html',
  styleUrls: ['./tcode.component.scss']
})
export class TcodeComponent {

  constructor(
    private _router: Router,
    private _reduxService: ReduxService,
  ) { }


  country$ = this._reduxService.state$.map(state => state.country);




  onEnter(tcode: string) {
    if (tcode.trim().length === 0) {
      return;
    }

    const urlParams: Array<string> = this._reduxService.getMenu()
      .filter(menu => menu.isComponent)
      .filter(menu => menu.hasOwnProperty('tcode'))
      .filter(menu => menu.tcode.trim().toLowerCase() === tcode.toLowerCase())[0].urlParams;

    urlParams[0] = this._reduxService.getCountry();
    this._router.navigate([urlParams.join('/')]);
  }
}
