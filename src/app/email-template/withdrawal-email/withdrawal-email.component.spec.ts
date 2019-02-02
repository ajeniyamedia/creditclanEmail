import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalEmailComponent } from './withdrawal-email.component';

describe('WithdrawalEmailComponent', () => {
  let component: WithdrawalEmailComponent;
  let fixture: ComponentFixture<WithdrawalEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
