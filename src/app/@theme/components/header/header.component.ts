import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Logout', target: 'logout' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
  }


  menuClick(event) {
    console.log(event);

    if (event.target === 'logout') {
      this._authService.logOut();
    }
  }
}
