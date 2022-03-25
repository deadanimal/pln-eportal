import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsInterestingsComponent } from './what-is-interestings.component';

describe('WhatIsInterestingsComponent', () => {
  let component: WhatIsInterestingsComponent;
  let fixture: ComponentFixture<WhatIsInterestingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatIsInterestingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIsInterestingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
