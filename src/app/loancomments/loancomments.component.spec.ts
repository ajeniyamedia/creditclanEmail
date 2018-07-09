import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoancommentsComponent } from './loancomments.component';

describe('LoancommentsComponent', () => {
  let component: LoancommentsComponent;
  let fixture: ComponentFixture<LoancommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoancommentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoancommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
