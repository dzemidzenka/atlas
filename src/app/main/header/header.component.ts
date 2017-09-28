import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'atlas-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Atlas';

  constructor(
    private _titleService: Title,
  ) { }

  ngOnInit() {
    this.title = this._titleService.getTitle();
  }
}
