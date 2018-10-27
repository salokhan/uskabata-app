import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartendyearComponent } from './startendyear.component';

describe('StartendyearComponent', () => {
  let component: StartendyearComponent;
  let fixture: ComponentFixture<StartendyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartendyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartendyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
