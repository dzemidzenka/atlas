import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { ReduxService } from '../../../providers/redux.service';
import { IMenuModel } from '../../../models/models';

// import uniqBy from 'lodash-es/uniqBy';



@Component({
  selector: 'atlas-stickynotes',
  templateUrl: './stickynotes.component.html',
  styleUrls: ['./stickynotes.component.scss']
})
export class StickynotesComponent {
  constructor(
    private _router: Router,
  ) { }

  @Input() menu: Array<IMenuModel>;

  onClick(urlParams: Array<string>) {
     this._router.navigate([urlParams.join('/')]);
  }
}
