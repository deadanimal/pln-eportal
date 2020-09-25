import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsApplicationsComponent } from './visits-applications.component';

describe('VisitsApplicationsComponent', () => {
  let component: VisitsApplicationsComponent;
  let fixture: ComponentFixture<VisitsApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
