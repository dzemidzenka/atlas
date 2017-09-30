import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'atlas-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  loading = false;
  model: any = {};

  constructor(
    private _authService: AuthService,
  ) { }


  signIn() {
    this._authService.logIn('email@company.com', 'password');
  }
}
