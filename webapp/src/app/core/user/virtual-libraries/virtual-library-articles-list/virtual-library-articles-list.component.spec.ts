import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryArticlesListComponent } from './virtual-library-articles-list.component';

describe('VirtualLibraryArticlesListComponent', () => {
  let component: VirtualLibraryArticlesListComponent;
  let fixture: ComponentFixture<VirtualLibraryArticlesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryArticlesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
