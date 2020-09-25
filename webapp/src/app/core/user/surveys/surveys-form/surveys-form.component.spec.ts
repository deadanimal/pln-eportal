import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysFormComponent } from './surveys-form.component';

describe('SurveysFormComponent', () => {
  let component: SurveysFormComponent;
  let fixture: ComponentFixture<SurveysFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveysFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
