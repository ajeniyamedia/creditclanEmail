import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanstatementComponent } from './loanstatement.component';

describe('LoanstatementComponent', () => {
  let component: LoanstatementComponent;
  let fixture: ComponentFixture<LoanstatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanstatementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
