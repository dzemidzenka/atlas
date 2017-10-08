import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToasterConfig, ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private _titleService: Title,
  ) { }

  readonly title = 'Atlas';

  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'flyRight',
    limit: 5,
    showCloseButton: true
  });

  ngOnInit() {
    this._titleService.setTitle(this.title);
  }
}
