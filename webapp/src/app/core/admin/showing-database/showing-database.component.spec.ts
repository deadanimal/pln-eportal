import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingDatabaseComponent } from './showing-database.component';

describe('ShowingDatabaseComponent', () => {
  let component: ShowingDatabaseComponent;
  let fixture: ComponentFixture<ShowingDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowingDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
