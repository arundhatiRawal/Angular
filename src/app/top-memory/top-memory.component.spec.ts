import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMemoryComponent } from './top-memory.component';

describe('TopMemoryComponent', () => {
  let component: TopMemoryComponent;
  let fixture: ComponentFixture<TopMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
