import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRepaymentComponent } from './no-repayment.component';

describe('NoRepaymentComponent', () => {
  let component: NoRepaymentComponent;
  let fixture: ComponentFixture<NoRepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoRepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
