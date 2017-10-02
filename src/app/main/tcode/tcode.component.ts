import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MdAutocompleteTrigger} from '@angular/material';

import { Router } from '@angular/router';
import { ReduxService } from '../../providers/redux.service';
import { Observable } from 'rxjs/Observable';
import { IMenuModel } from '../../models/models';


@Component({
  selector: 'atlas-tcode',
  templateUrl: './tcode.component.html',
  styleUrls: ['./tcode.component.scss']
})
export class TcodeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _reduxService: ReduxService,
  ) { }

  @ViewChild(MdAutocompleteTrigger) trigger;
  country$ = this._reduxService.state$.map(state => state.country);



  menuCtrl: FormControl;
  filteredMenu: Observable<Array<IMenuModel>>;


  ngOnInit() {
    this.menuCtrl = new FormControl();
    this.filteredMenu = this.menuCtrl.valueChanges
      .startWith(null)
      .map(menu => menu ? this.filterMenu(menu) : this._reduxService.getCurrentState().menu.filter(item => item.tcode));
  }

  filterMenu(tcode: string) {
    return this._reduxService.getCurrentState().menu
      .filter(item => item.hasOwnProperty('tcode'))
      .filter(item => item.tcode)
      .filter(item => item.tcode.toLowerCase().includes(tcode.toLowerCase()));
  }





  onSelect(tcode: string) {
    if (tcode.trim().length === 0) {
      return;
    }

    const urlParams: Array<string> = this._reduxService.getCurrentState().menu
      .filter(menu => menu.isComponent)
      .filter(menu => menu.hasOwnProperty('tcode'))
      .filter(menu => menu.tcode.trim().toLowerCase() === tcode.toLowerCase())[0].urlParams;

    urlParams[0] = this._reduxService.getCurrentState().country;
    this._router.navigate([urlParams.join('/')]);
    this.menuCtrl.setValue(null);
    this.trigger.closePanel();
    window.focus();
  }
}
