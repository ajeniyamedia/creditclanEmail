import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoancontractComponent } from './loancontract.component';

describe('LoancontractComponent', () => {
  let component: LoancontractComponent;
  let fixture: ComponentFixture<LoancontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoancontractComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoancontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
