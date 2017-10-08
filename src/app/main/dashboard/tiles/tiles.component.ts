import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IMenuModel } from '../../../models/models';



@Component({
  selector: 'atlas-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TilesComponent {

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
