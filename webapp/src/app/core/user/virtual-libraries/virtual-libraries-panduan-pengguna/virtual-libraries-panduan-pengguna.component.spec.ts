import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibrariesPanduanPenggunaComponent } from './virtual-libraries-panduan-pengguna.component';

describe('VirtualLibrariesPanduanPenggunaComponent', () => {
  let component: VirtualLibrariesPanduanPenggunaComponent;
  let fixture: ComponentFixture<VirtualLibrariesPanduanPenggunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLibrariesPanduanPenggunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLibrariesPanduanPenggunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
