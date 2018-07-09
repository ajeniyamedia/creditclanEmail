import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoancontractformComponent } from './loancontractform.component';

describe('LoancontractformComponent', () => {
  let component: LoancontractformComponent;
  let fixture: ComponentFixture<LoancontractformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoancontractformComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoancontractformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
