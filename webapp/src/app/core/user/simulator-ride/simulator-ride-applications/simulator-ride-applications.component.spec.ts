import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorRideApplicationsComponent } from './simulator-ride-applications.component';

describe('SimulatorRideApplicationsComponent', () => {
  let component: SimulatorRideApplicationsComponent;
  let fixture: ComponentFixture<SimulatorRideApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorRideApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorRideApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
