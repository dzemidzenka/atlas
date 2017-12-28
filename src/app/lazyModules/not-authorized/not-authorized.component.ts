import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { Router } from '@angular/router';
import { AppService } from '@main/app.service';

@Component({
  selector: 'atlas-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotAuthorizedComponent {
  constructor(
    // private _router: Router,
    private _appService: AppService,
  ) { }

  state$ = this._appService.state$;
  // url: string = '';

  // ngOnInit() {
  //   const urlTree = this._router.parseUrl(this._router.url);
  //   this.url = urlTree.queryParams['from'];
  // }
}