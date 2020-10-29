import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryEsourceCategoriesListComponent } from './virtual-library-esource-categories-list.component';

describe('VirtualLibraryEsourceCategoriesListComponent', () => {
  let component: VirtualLibraryEsourceCategoriesListComponent;
  let fixture: ComponentFixture<VirtualLibraryEsourceCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryEsourceCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryEsourceCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
