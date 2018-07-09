import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanportfolioComponent } from './loanportfolio.component';

describe('LoanportfolioComponent', () => {
  let component: LoanportfolioComponent;
  let fixture: ComponentFixture<LoanportfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanportfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
