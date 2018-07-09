import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFinanceComponent } from './customer-finance.component';

describe('CustomerFinanceComponent', () => {
  let component: CustomerFinanceComponent;
  let fixture: ComponentFixture<CustomerFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerFinanceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
