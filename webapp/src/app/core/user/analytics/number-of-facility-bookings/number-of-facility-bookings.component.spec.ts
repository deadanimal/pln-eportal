import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfFacilityBookingsComponent } from './number-of-facility-bookings.component';

describe('NumberOfFacilityBookingsComponent', () => {
  let component: NumberOfFacilityBookingsComponent;
  let fixture: ComponentFixture<NumberOfFacilityBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfFacilityBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfFacilityBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
