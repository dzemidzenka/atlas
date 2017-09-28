import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { ReduxService } from '../../providers/redux.service';


@Component({
  selector: 'atlas-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
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
    this._router.navigate([`/${this._reduxService.country}/dashboard`]);
  }

  switchCountry(country: string) {
    if (this._reduxService.folder) {
      this._router.navigate([`/${country}/${this._reduxService.component}/${this._reduxService.folder}`]);
    } else {
      this._router.navigate([`/${country}/${this._reduxService.component}`]);
    }
  }
}
