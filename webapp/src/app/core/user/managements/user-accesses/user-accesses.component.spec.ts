import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessesComponent } from './user-accesses.component';

describe('UserAccessesComponent', () => {
  let component: UserAccessesComponent;
  let fixture: ComponentFixture<UserAccessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
