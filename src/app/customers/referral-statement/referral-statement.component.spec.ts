import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralStatementComponent } from './referral-statement.component';

describe('ReferralStatementComponent', () => {
  let component: ReferralStatementComponent;
  let fixture: ComponentFixture<ReferralStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
