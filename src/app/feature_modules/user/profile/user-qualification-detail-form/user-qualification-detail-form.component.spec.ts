import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQualificationDetailFormComponent } from './user-qualification-detail-form.component';

describe('UserQualificationDetailComponent', () => {
  let component: UserQualificationDetailFormComponent;
  let fixture: ComponentFixture<UserQualificationDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQualificationDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQualificationDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
