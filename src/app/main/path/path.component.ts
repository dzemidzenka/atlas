import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../providers/redux.service';
import { ACTION, VIEW } from '../../models/models';


@Component({
  selector: 'atlas-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathComponent {
  constructor(
    private _reduxService: ReduxService,
  ) { }

  path$ = this._reduxService.state$
    // .filter(state => state.action.op === ACTION.ROUTE)
    .map(state => Object.assign({
      'urlParams': state.urlParams,
      'isComponent': state.isComponent,
      'country': state.country,
      'language': state.language
    }));

  VIEW = Object.values(VIEW);



  switchView(view: VIEW) {
    this._reduxService.actionDashboard(view);
  }

  onClick(event: string, index: number) {
    const urlParams = this._reduxService.getCurrentState().urlParams;
    this._reduxService.actionMenu(urlParams.slice(0, index + 1));
  }
}
