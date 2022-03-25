import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorSummariesComponent } from './visitor-summaries.component';

describe('VisitorSummariesComponent', () => {
  let component: VisitorSummariesComponent;
  let fixture: ComponentFixture<VisitorSummariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorSummariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorSummariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
