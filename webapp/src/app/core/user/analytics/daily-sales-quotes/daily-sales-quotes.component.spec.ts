import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySalesQuotesComponent } from './daily-sales-quotes.component';

describe('DailySalesQuotesComponent', () => {
  let component: DailySalesQuotesComponent;
  let fixture: ComponentFixture<DailySalesQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySalesQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySalesQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
