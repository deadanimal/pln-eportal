import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryBooksListComponent } from './virtual-library-books-list.component';

describe('VirtualLibraryBooksListComponent', () => {
  let component: VirtualLibraryBooksListComponent;
  let fixture: ComponentFixture<VirtualLibraryBooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryBooksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
