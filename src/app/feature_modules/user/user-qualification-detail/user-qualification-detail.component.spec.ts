import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQualificationDetailComponent } from './user-qualification-detail.component';

describe('UserQualificationDetailComponent', () => {
  let component: UserQualificationDetailComponent;
  let fixture: ComponentFixture<UserQualificationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQualificationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQualificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
