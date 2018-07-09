import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanfeesComponent } from './loanfees.component';

describe('LoanfeesComponent', () => {
  let component: LoanfeesComponent;
  let fixture: ComponentFixture<LoanfeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanfeesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
