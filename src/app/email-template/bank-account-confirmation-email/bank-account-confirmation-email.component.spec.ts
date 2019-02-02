import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountConfirmationEmailComponent } from './bank-account-confirmation-email.component';

describe('BankAccountConfirmationEmailComponent', () => {
  let component: BankAccountConfirmationEmailComponent;
  let fixture: ComponentFixture<BankAccountConfirmationEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountConfirmationEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountConfirmationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
