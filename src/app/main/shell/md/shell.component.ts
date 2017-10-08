import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShellComponent } from '../shell.component';


@Component({
  selector: 'atlas-shellMd',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellMdComponent extends ShellComponent { }
