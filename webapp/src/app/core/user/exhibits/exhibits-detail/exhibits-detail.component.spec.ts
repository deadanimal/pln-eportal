import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitsDetailComponent } from './exhibits-detail.component';

describe('ExhibitsDetailComponent', () => {
  let component: ExhibitsDetailComponent;
  let fixture: ComponentFixture<ExhibitsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
