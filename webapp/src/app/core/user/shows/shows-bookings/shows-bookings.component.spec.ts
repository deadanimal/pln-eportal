import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsBookingsComponent } from './shows-bookings.component';

describe('ShowsBookingsComponent', () => {
  let component: ShowsBookingsComponent;
  let fixture: ComponentFixture<ShowsBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
