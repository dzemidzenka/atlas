import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { ReduxService } from '../../../providers/redux.service';
import { IMenuModel } from '../../../models/models';

// import uniqBy from 'lodash-es/uniqBy';



@Component({
  selector: 'atlas-stickynotes',
  templateUrl: './stickynotes.component.html',
  styleUrls: ['./stickynotes.component.scss']
})
export class StickynotesComponent implements OnInit {
  constructor(
    private _router: Router,
    // private _reduxService: ReduxService,
  ) { }

  @Input() menu: Array<IMenuModel>;
  // folders;
  // items;



  // _routes: Routes = ROUTES.filter(route => route.hasOwnProperty('data'));
  // routes = this._routes;

  // folders: Routes = uniqBy(this._routes.filter(route => route.data.hasOwnProperty('folder')), 'data.folder');
  // private _folders: Routes = this.folders;

  // items: Routes = this._routes.filter(route => !route.data.hasOwnProperty('folder'));
  // private _items: Routes = this.items;

  // itemView: boolean;



  ngOnInit() {
    // this.items = this.menu;
    // console.log('DASH', this.items, this._reduxService.urlParams);
  }

  onFolderClick(path: Array<string>) {
    // this.itemView = true;
    // this.items = this._routes.filter(route => route.data.folder === folderName);
    // this._router.navigate([`/${this._reduxService.country}/dashboard/${folderName}`]);
  }

  onClick(urlParams: Array<string>) {
     this._router.navigate([urlParams.join('/')]);
  }


  // onKeyUp(text: string) {
  //   if (!text) {
  //     this.routes = this._routes;
  //     return;
  //   }

  //   this.routes = this._routes
  //     .filter(route => route.data.name.toLowerCase().includes(text.toLowerCase()));
  // }
}
