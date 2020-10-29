import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryEsourcesListComponent } from './virtual-library-esources-list.component';

describe('VirtualLibraryEsourcesListComponent', () => {
  let component: VirtualLibraryEsourcesListComponent;
  let fixture: ComponentFixture<VirtualLibraryEsourcesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibraryEsourcesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibraryEsourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
