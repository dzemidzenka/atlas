import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSelectorComponent } from './apps-selector.component';

describe('AppsSelectorComponent', () => {
  let component: AppsSelectorComponent;
  let fixture: ComponentFixture<AppsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
