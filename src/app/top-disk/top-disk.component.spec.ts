import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDiskComponent } from './top-disk.component';

describe('TopDiskComponent', () => {
  let component: TopDiskComponent;
  let fixture: ComponentFixture<TopDiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
