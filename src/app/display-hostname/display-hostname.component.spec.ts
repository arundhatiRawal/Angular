import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHostnameComponent } from './display-hostname.component';

describe('DisplayHostnameComponent', () => {
  let component: DisplayHostnameComponent;
  let fixture: ComponentFixture<DisplayHostnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayHostnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayHostnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
