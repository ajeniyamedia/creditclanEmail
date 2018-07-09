import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanchargesComponent } from './loancharges.component';

describe('LoanchargesComponent', () => {
  let component: LoanchargesComponent;
  let fixture: ComponentFixture<LoanchargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanchargesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanchargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
