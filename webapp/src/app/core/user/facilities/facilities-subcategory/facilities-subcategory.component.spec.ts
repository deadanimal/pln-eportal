import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesSubcategoryComponent } from './facilities-subcategory.component';

describe('FacilitiesSubcategoryComponent', () => {
  let component: FacilitiesSubcategoryComponent;
  let fixture: ComponentFixture<FacilitiesSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
