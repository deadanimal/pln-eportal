import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpxsListComponent } from './fpxs-list.component';

describe('FpxsListComponent', () => {
  let component: FpxsListComponent;
  let fixture: ComponentFixture<FpxsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpxsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpxsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
