import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentReminderEmailComponent } from './repayment-reminder-email.component';

describe('RepaymentReminderEmailComponent', () => {
  let component: RepaymentReminderEmailComponent;
  let fixture: ComponentFixture<RepaymentReminderEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaymentReminderEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentReminderEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
