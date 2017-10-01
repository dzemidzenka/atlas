import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReduxService } from '../../../providers/redux.service';
import { IMenuModel } from '../../../models/models';



@Component({
  selector: 'atlas-stickynotes',
  templateUrl: './stickynotes.component.html',
  styleUrls: ['./stickynotes.component.scss']
})
export class StickynotesComponent {
  constructor(
    private _router: Router,
    private _reduxService: ReduxService,
  ) { }

  @Input() menu: Array<IMenuModel>;


  onClick(urlParams: Array<string>) {
    this._router.navigate([urlParams.join('/')]);
  }


  favoriteAdd(item: IMenuModel) {
    this._reduxService.actionFavoriteAdd(item);
  }


  favoriteRemove(item: IMenuModel) {
    this._reduxService.actionFavoriteRemove(item);
  }
}
