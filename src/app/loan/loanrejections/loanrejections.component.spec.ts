import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanrejectionsComponent } from './loanrejections.component';

describe('LoanrejectionsComponent', () => {
  let component: LoanrejectionsComponent;
  let fixture: ComponentFixture<LoanrejectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanrejectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanrejectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
