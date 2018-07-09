import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaneirComponent } from './loaneir.component';

describe('LoaneirComponent', () => {
  let component: LoaneirComponent;
  let fixture: ComponentFixture<LoaneirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaneirComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaneirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
