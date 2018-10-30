import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartendtimeComponent } from './startendtime.component';

describe('StartendtimeComponent', () => {
  let component: StartendtimeComponent;
  let fixture: ComponentFixture<StartendtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartendtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartendtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
