import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkProfileComponent } from './user-work-profile.component';

describe('UserWorkProfileComponent', () => {
  let component: UserWorkProfileComponent;
  let fixture: ComponentFixture<UserWorkProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
