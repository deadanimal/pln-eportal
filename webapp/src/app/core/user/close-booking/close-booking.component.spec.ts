import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseBookingComponent } from './close-booking.component';

describe('CloseBookingComponent', () => {
  let component: CloseBookingComponent;
  let fixture: ComponentFixture<CloseBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
