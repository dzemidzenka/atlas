import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'atlas-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
