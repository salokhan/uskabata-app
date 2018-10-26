import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGeneralDetailComponent } from './user-general-detail.component';

describe('UserGeneralDetailComponent', () => {
  let component: UserGeneralDetailComponent;
  let fixture: ComponentFixture<UserGeneralDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGeneralDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGeneralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
