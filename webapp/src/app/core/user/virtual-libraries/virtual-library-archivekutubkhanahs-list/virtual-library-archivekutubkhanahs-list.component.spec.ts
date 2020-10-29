import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryArchivekutubkhanahsListComponent } from './virtual-library-archivekutubkhanahs-list.component';

describe('VirtualLibraryArchivekutubkhanahsListComponent', () => {
  let component: VirtualLibraryArchivekutubkhanahsListComponent;
  let fixture: ComponentFixture<VirtualLibraryArchivekutubkhanahsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryArchivekutubkhanahsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryArchivekutubkhanahsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
