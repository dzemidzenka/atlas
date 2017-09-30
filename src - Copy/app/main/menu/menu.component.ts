import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { ReduxService } from '../../providers/redux.service';


@Component({
  selector: 'atlas-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  // preserveWhitespaces: false,
})
export class MenuComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _reduxService: ReduxService,
  ) { }

  ngOnInit() {
  }

  signOut() {
    this._authService.signOut();
  }

  dashboard() {
    this._router.navigate([`/${this._reduxService.country}`]);
  }

  switchCountry(country: string) {
    const params = [...this._reduxService.urlParams];
    params[0] = country;
    this._router.navigate([params.join('/')]);
  }




  displayMode: string = 'default';
  multi = false;
  hideToggle = false;
  disabled = false;
  showPanel3 = true;
  expandedHeight: string;
  collapsedHeight: string;
}
