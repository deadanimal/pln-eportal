import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifikasiComponent } from './notifikasi.component';

describe('NotifikasiComponent', () => {
  let component: NotifikasiComponent;
  let fixture: ComponentFixture<NotifikasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifikasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifikasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
