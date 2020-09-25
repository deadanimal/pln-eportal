import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsOperationComponent } from './reports-operation.component';

describe('ReportsOperationComponent', () => {
  let component: ReportsOperationComponent;
  let fixture: ComponentFixture<ReportsOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
