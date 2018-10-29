import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkPlaceDetailFormComponent } from './user-work-place-detail-form.component';

describe('UserWorkPlaceDetailFormComponent', () => {
  let component: UserWorkPlaceDetailFormComponent;
  let fixture: ComponentFixture<UserWorkPlaceDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkPlaceDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkPlaceDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
