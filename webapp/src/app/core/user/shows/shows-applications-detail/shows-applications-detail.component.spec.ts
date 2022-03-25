import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsApplicationsDetailComponent } from './shows-applications-detail.component';

describe('ShowsApplicationsDetailComponent', () => {
  let component: ShowsApplicationsDetailComponent;
  let fixture: ComponentFixture<ShowsApplicationsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsApplicationsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsApplicationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
