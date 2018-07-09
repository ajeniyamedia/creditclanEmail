import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedRepaymentComponent } from './missed-repayment.component';

describe('MissedRepaymentComponent', () => {
  let component: MissedRepaymentComponent;
  let fixture: ComponentFixture<MissedRepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissedRepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissedRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
