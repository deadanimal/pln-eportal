import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpxsBankListComponent } from './fpxs-bank-list.component';

describe('FpxsBankListComponent', () => {
  let component: FpxsBankListComponent;
  let fixture: ComponentFixture<FpxsBankListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpxsBankListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpxsBankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
