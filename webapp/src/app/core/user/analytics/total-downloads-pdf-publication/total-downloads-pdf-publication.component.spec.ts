import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDownloadsPdfPublicationComponent } from './total-downloads-pdf-publication.component';

describe('TotalDownloadsPdfPublicationComponent', () => {
  let component: TotalDownloadsPdfPublicationComponent;
  let fixture: ComponentFixture<TotalDownloadsPdfPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalDownloadsPdfPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalDownloadsPdfPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
