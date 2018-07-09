import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentrollbackComponent } from './paymentrollback.component';

describe('PaymentrollbackComponent', () => {
  let component: PaymentrollbackComponent;
  let fixture: ComponentFixture<PaymentrollbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentrollbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentrollbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
