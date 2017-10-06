import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'atlas-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  loading = false;
  model: any = {};

  constructor(
    private _authService: AuthService,
  ) { }


  logIn() {
    this._authService.logIn('email@company.com', 'password');
  }
}
