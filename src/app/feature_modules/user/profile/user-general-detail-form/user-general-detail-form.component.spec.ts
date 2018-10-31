import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGeneralDetailFormComponent } from './user-general-detail-form.component';

describe('UserGeneralDetailFormComponent', () => {
  let component: UserGeneralDetailFormComponent;
  let fixture: ComponentFixture<UserGeneralDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGeneralDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGeneralDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
