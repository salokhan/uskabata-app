import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsGridviewComponent } from './results-gridview.component';

describe('ResultsGridviewComponent', () => {
  let component: ResultsGridviewComponent;
  let fixture: ComponentFixture<ResultsGridviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsGridviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsGridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
