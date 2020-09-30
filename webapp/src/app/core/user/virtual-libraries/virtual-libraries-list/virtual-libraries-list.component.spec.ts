import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibrariesListComponent } from './virtual-libraries-list.component';

describe('VirtualLibrariesListComponent', () => {
  let component: VirtualLibrariesListComponent;
  let fixture: ComponentFixture<VirtualLibrariesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibrariesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibrariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
