import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPriceComponent } from './tickets-price.component';

describe('TicketsPriceComponent', () => {
  let component: TicketsPriceComponent;
  let fixture: ComponentFixture<TicketsPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
