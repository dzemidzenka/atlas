import { Component, OnInit } from '@angular/core';
import { ReduxService } from '../../providers/redux.service';

@Component({
  selector: 'atlas-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private _reduxService: ReduxService,
  ) { }

  ngOnInit() {
  }


  onClick() {
    this._reduxService.actionNotify([{
      message: 'New notification' + Math.random(),
      date: Date.now(),
    }]);
  }
}
