import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOperatingsComponent } from './daily-operatings.component';

describe('DailyOperatingsComponent', () => {
  let component: DailyOperatingsComponent;
  let fixture: ComponentFixture<DailyOperatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyOperatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyOperatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
