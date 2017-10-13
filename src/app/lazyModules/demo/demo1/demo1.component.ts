import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReduxService } from '../../../providers/redux.service';

@Component({
  selector: 'atlas-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo1Component {
  constructor(
    private _reduxService: ReduxService,
  ) { }


}
