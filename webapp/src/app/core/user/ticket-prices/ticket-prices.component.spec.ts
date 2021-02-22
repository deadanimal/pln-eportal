import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPricesComponent } from './ticket-prices.component';

describe('TicketPricesComponent', () => {
  let component: TicketPricesComponent;
  let fixture: ComponentFixture<TicketPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
