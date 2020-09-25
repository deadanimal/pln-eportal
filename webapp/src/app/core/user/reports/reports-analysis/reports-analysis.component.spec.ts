import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAnalysisComponent } from './reports-analysis.component';

describe('ReportsAnalysisComponent', () => {
  let component: ReportsAnalysisComponent;
  let fixture: ComponentFixture<ReportsAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
