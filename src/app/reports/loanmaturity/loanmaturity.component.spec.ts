import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanmaturityComponent } from './loanmaturity.component';

describe('LoanmaturityComponent', () => {
  let component: LoanmaturityComponent;
  let fixture: ComponentFixture<LoanmaturityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanmaturityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanmaturityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
