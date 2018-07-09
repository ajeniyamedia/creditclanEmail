import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanscheduleComponent } from './loanschedule.component';

describe('LoanscheduleComponent', () => {
  let component: LoanscheduleComponent;
  let fixture: ComponentFixture<LoanscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanscheduleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
