import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfVisitorsComponent } from './number-of-visitors.component';

describe('NumberOfVisitorsComponent', () => {
  let component: NumberOfVisitorsComponent;
  let fixture: ComponentFixture<NumberOfVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
