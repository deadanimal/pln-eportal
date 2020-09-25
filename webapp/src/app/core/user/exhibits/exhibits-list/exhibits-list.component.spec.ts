import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitsListComponent } from './exhibits-list.component';

describe('ExhibitsListComponent', () => {
  let component: ExhibitsListComponent;
  let fixture: ComponentFixture<ExhibitsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
