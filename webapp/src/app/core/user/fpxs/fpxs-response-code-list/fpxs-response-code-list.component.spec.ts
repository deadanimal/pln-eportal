import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpxsResponseCodeListComponent } from './fpxs-response-code-list.component';

describe('FpxsResponseCodeListComponent', () => {
  let component: FpxsResponseCodeListComponent;
  let fixture: ComponentFixture<FpxsResponseCodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpxsResponseCodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpxsResponseCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
