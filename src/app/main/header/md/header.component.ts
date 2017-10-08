import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../header.component';


@Component({
  selector: 'atlas-headerMd',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMdComponent extends HeaderComponent {
}
