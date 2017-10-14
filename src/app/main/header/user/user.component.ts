import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';

interface UserMenuItem {
  title: string;
  link?: string;
  url?: string;
  target?: string;
  icon?: string;
}


@Component({
  selector: 'atlas-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  constructor(
    private _authService: AuthService,
  ) { }

  @Input() name;
  @Input() picture: string;

  menu = [
    {
      title: 'Profile',
      target: 'profile',
      translationPath: 'dashboard.profile'
    },
    {
      title: 'Logout',
      target: 'logout',
      translationPath: 'dashboard.logout'
    }
  ];

  isMenuShown = false;



  toggleMenu() {
    this.isMenuShown = !this.isMenuShown;
  }


  menuClick(target) {
    if (target === 'logout') {
      this._authService.logOut();
    }
  }
}
