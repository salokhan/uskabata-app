import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfessionalDetailFormComponent } from './user-professional-detail-form.component';

describe('UserProfessionalDetailFormComponent', () => {
  let component: UserProfessionalDetailFormComponent;
  let fixture: ComponentFixture<UserProfessionalDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfessionalDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfessionalDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
