import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDownloadsPdfVirtualLibraryComponent } from './total-downloads-pdf-virtual-library.component';

describe('TotalDownloadsPdfVirtualLibraryComponent', () => {
  let component: TotalDownloadsPdfVirtualLibraryComponent;
  let fixture: ComponentFixture<TotalDownloadsPdfVirtualLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalDownloadsPdfVirtualLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalDownloadsPdfVirtualLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
