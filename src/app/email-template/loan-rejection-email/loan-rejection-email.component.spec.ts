import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRejectionEmailComponent } from './loan-rejection-email.component';

describe('LoanRejectionEmailComponent', () => {
  let component: LoanRejectionEmailComponent;
  let fixture: ComponentFixture<LoanRejectionEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRejectionEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRejectionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
