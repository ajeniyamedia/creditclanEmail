import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDisbursedEmailComponent } from './loan-disbursed-email.component';

describe('LoanDisbursedEmailComponent', () => {
  let component: LoanDisbursedEmailComponent;
  let fixture: ComponentFixture<LoanDisbursedEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanDisbursedEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDisbursedEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
