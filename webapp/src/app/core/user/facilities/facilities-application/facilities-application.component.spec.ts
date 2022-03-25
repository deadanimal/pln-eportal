import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesApplicationComponent } from './facilities-application.component';

describe('FacilitiesApplicationComponent', () => {
  let component: FacilitiesApplicationComponent;
  let fixture: ComponentFixture<FacilitiesApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
