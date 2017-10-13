import { Component, Input, HostBinding, Output, EventEmitter, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'atlas-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  constructor(private el: ElementRef) { }

  @Input() name;
  @Input() picture: string;
  @Input() menu: UserMenuItem[] = [];
  @Output() menuClick = new EventEmitter<UserMenuItem>();
  @HostListener('document:click', ['$event'])

  isMenuShown = false;

  itemClick(event: any, item: UserMenuItem): boolean {
    this.menuClick.emit(item);
    return false;
  }

  toggleMenu() {
    this.isMenuShown = !this.isMenuShown;
  }

  // hideMenu(event: any) {
  //   if (!this.el.nativeElement.contains(event.target)) {
  //     this.isMenuShown = false;
  //   }
  // }

  hasMenu(): boolean {
    return this.menu && this.menu.length > 0;
  }
}



interface UserMenuItem {
  title: string;
  link?: string;
  url?: string;
  target?: string;
  icon?: string;
}
