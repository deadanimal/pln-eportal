import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfProgramParticipantsComponent } from './number-of-program-participants.component';

describe('NumberOfProgramParticipantsComponent', () => {
  let component: NumberOfProgramParticipantsComponent;
  let fixture: ComponentFixture<NumberOfProgramParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfProgramParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfProgramParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
