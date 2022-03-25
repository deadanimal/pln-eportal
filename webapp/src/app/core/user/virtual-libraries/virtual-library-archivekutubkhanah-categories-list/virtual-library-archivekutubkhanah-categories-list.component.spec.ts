import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryArchivekutubkhanahCategoriesListComponent } from './virtual-library-archivekutubkhanah-categories-list.component';

describe('VirtualLibraryArchivekutubkhanahCategoriesListComponent', () => {
  let component: VirtualLibraryArchivekutubkhanahCategoriesListComponent;
  let fixture: ComponentFixture<VirtualLibraryArchivekutubkhanahCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryArchivekutubkhanahCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryArchivekutubkhanahCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
