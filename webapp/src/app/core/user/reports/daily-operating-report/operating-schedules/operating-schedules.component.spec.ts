import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingSchedulesComponent } from './operating-schedules.component';

describe('OperatingSchedulesComponent', () => {
  let component: OperatingSchedulesComponent;
  let fixture: ComponentFixture<OperatingSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
