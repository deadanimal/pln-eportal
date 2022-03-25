import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorRideScheduleComponent } from './simulator-ride-schedule.component';

describe('SimulatorRideScheduleComponent', () => {
  let component: SimulatorRideScheduleComponent;
  let fixture: ComponentFixture<SimulatorRideScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorRideScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorRideScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
