import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTicketSalesShowsComponent } from './total-ticket-sales-shows.component';

describe('TotalTicketSalesShowsComponent', () => {
  let component: TotalTicketSalesShowsComponent;
  let fixture: ComponentFixture<TotalTicketSalesShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalTicketSalesShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalTicketSalesShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
