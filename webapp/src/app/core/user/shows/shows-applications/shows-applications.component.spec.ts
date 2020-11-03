import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsApplicationsComponent } from './shows-applications.component';

describe('ShowsApplicationsComponent', () => {
  let component: ShowsApplicationsComponent;
  let fixture: ComponentFixture<ShowsApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
