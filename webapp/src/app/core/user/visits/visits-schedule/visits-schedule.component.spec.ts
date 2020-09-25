import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsScheduleComponent } from './visits-schedule.component';

describe('VisitsScheduleComponent', () => {
  let component: VisitsScheduleComponent;
  let fixture: ComponentFixture<VisitsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
