import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentwithdrawalComponent } from './investmentwithdrawal.component';

describe('InvestmentwithdrawalComponent', () => {
  let component: InvestmentwithdrawalComponent;
  let fixture: ComponentFixture<InvestmentwithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentwithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentwithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
