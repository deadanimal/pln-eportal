import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsApplicationComponent } from './programs-application.component';

describe('ProgramsApplicationComponent', () => {
  let component: ProgramsApplicationComponent;
  let fixture: ComponentFixture<ProgramsApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramsApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
