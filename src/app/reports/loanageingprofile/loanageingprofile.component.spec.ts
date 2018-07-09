import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanageingprofileComponent } from './loanageingprofile.component';

describe('LoanageingprofileComponent', () => {
  let component: LoanageingprofileComponent;
  let fixture: ComponentFixture<LoanageingprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanageingprofileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanageingprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
