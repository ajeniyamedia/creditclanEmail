import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanapprovalsComponent } from './loanapprovals.component';

describe('LoanapprovalsComponent', () => {
  let component: LoanapprovalsComponent;
  let fixture: ComponentFixture<LoanapprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanapprovalsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
