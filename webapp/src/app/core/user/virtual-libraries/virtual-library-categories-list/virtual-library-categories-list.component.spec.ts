import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryCategoriesListComponent } from './virtual-library-categories-list.component';

describe('VirtualLibraryCategoriesListComponent', () => {
  let component: VirtualLibraryCategoriesListComponent;
  let fixture: ComponentFixture<VirtualLibraryCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
