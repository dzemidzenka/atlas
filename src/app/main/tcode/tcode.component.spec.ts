import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcodeComponent } from './tcode.component';

describe('TcodeComponent', () => {
  let component: TcodeComponent;
  let fixture: ComponentFixture<TcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
