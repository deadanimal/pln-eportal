import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysAnswerComponent } from './surveys-answer.component';

describe('SurveysAnswerComponent', () => {
  let component: SurveysAnswerComponent;
  let fixture: ComponentFixture<SurveysAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveysAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveysAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
