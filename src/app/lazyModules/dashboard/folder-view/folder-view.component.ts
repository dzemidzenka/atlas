import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../../main/app.routes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'atlas-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.scss']
})
export class FolderViewComponent implements OnInit {
  constructor(
    private _r: ActivatedRoute
  ) { }

  items = ROUTES
    .filter(route => route.hasOwnProperty('data'))
    .filter(route => route.data.hasOwnProperty('folder'))
    .filter(route => route.data.folder.toLowerCase() === this._r.snapshot.params['folder'].toLowerCase());


  ngOnInit() {
  }

  onClick(path: string) {
    // const _path = path.includes('/') ? '/' + this._reduxService.country + '/' + path.split('/')[1] : path;
    // this._router.navigate([_path]);
  }
}
