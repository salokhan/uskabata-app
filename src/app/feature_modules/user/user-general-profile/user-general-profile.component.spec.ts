import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGeneralProfileComponent } from './user-general-profile.component';

describe('UserGeneralProfileComponent', () => {
  let component: UserGeneralProfileComponent;
  let fixture: ComponentFixture<UserGeneralProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGeneralProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGeneralProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
