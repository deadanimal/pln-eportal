import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDirectoriesComponent } from './employee-directories.component';

describe('EmployeeDirectoriesComponent', () => {
  let component: EmployeeDirectoriesComponent;
  let fixture: ComponentFixture<EmployeeDirectoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDirectoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDirectoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
