import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsWaitingListComponent } from './programs-waiting-list.component';

describe('ProgramsWaitingListComponent', () => {
  let component: ProgramsWaitingListComponent;
  let fixture: ComponentFixture<ProgramsWaitingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramsWaitingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsWaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
