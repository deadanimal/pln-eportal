import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorRideBookingsComponent } from './simulator-ride-bookings.component';

describe('SimulatorRideBookingsComponent', () => {
  let component: SimulatorRideBookingsComponent;
  let fixture: ComponentFixture<SimulatorRideBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorRideBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorRideBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
