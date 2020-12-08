import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTicketSalesSimulatorRidesComponent } from './total-ticket-sales-simulator-rides.component';

describe('TotalTicketSalesSimulatorRidesComponent', () => {
  let component: TotalTicketSalesSimulatorRidesComponent;
  let fixture: ComponentFixture<TotalTicketSalesSimulatorRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalTicketSalesSimulatorRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalTicketSalesSimulatorRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
