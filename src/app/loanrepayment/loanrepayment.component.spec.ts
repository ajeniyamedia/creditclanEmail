import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanrepaymentComponent } from './loanrepayment.component';

describe('LoanrepaymentComponent', () => {
  let component: LoanrepaymentComponent;
  let fixture: ComponentFixture<LoanrepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanrepaymentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanrepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
