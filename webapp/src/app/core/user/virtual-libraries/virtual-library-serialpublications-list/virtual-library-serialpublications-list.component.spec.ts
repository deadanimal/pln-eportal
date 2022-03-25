import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibrarySerialpublicationsListComponent } from './virtual-library-serialpublications-list.component';

describe('VirtualLibrarySerialpublicationsListComponent', () => {
  let component: VirtualLibrarySerialpublicationsListComponent;
  let fixture: ComponentFixture<VirtualLibrarySerialpublicationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibrarySerialpublicationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibrarySerialpublicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
