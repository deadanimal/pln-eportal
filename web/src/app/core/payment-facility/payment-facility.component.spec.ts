import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFacilityComponent } from './payment-facility.component';

describe('PaymentFacilityComponent', () => {
  let component: PaymentFacilityComponent;
  let fixture: ComponentFixture<PaymentFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
