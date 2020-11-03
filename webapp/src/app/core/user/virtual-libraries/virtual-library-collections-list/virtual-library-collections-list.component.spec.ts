import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryCollectionsListComponent } from './virtual-library-collections-list.component';

describe('VirtualLibraryCollectionsListComponent', () => {
  let component: VirtualLibraryCollectionsListComponent;
  let fixture: ComponentFixture<VirtualLibraryCollectionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryCollectionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryCollectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
