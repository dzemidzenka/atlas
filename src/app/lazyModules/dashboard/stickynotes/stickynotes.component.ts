import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ROUTES } from '../../../main/app.routes';
import { ReduxService } from '../../../providers/redux.service';

@Component({
  selector: 'atlas-stickynotes',
  templateUrl: './stickynotes.component.html',
  styleUrls: ['./stickynotes.component.scss']
})
export class StickynotesComponent implements OnInit {
  constructor(
    private _router: Router,
    private _reduxService: ReduxService,
  ) { }

  _routes: Routes = ROUTES.filter(route => route.hasOwnProperty('data'));
  routes = this._routes;

  folders: Routes = this._routes.filter(route => route.data.hasOwnProperty('folder'));
  private _folders: Routes = this.folders;

  items: Routes = this._routes.filter(route => !route.data.hasOwnProperty('folder'));
  private _items: Routes = this.items;

  itemView: boolean;



  ngOnInit() {
    console.log('folders', this.folders);
    console.log('items', this.items);

  }

  onFolderClick(folderName: string){
     console.log(folderName);
     this.itemView = true;
     this.items = this._routes.filter( route => route.data.folder === folderName);
     this._router.navigate(['/US/dashboard/main']);

  }


  onClick(path: string) {
    const _path = path.includes('/') ? '/' + this._reduxService.country + '/' + path.split('/')[1] : path;
    this._router.navigate([_path]);
  }

  onKeyUp(text: string) {
    if (!text) {
      this.routes = this._routes;
      return;
    }

    this.routes = this._routes
      .filter(route => route.data.name.toLowerCase().includes(text.toLowerCase()));
  }
}
