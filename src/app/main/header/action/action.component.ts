import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

interface UserMenuItem {
  title: string;
  target: string;
  iconClass: string;
  translationPath: string;
}

@Component({
  selector: 'atlas-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent {
  constructor() { }

  @Input() rightBorder = true;
  @Input() menu: UserMenuItem[] = [];
  @Output() menuClick = new EventEmitter<string>();

  isMenuShown = false;


  itemClick(event: any, item: UserMenuItem): boolean {
    this.menuClick.emit(item.target);
    return false;
  }

  toggleMenu() {
    this.isMenuShown = !this.isMenuShown;
  }

  hasMenu(): boolean {
    return this.menu && this.menu.length > 0;
  }
}
