import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IMenuModel } from '../../../models/models';

import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
  stagger
} from '@angular/animations';


@Component({
  selector: 'atlas-stickynotes',
  templateUrl: './stickynotes.component.html',
  styleUrls: ['./stickynotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('queryAnimation', [
      transition('* => goAnimate', [
        query(':self', stagger(2500, [
          style({ opacity: 0 }),
          animate('1s ease-in-out',
            style({ opacity: 1 })),
        ]), { optional: false }),
      ])
    ])
  ]
})
export class StickynotesComponent {
  constructor() { }

  @Input() menu: Array<IMenuModel>;
  @Output() navigate = new EventEmitter<Array<string>>();
  @Output() favoriteToggle = new EventEmitter<IMenuModel>();


  onNavigate(urlParams: Array<string>) {
    this.navigate.emit([urlParams.join('/')]);
  }

  onFavoriteToggle(item: IMenuModel) {
    this.favoriteToggle.emit(item);
  }
}
