import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoansComponent } from './customer-loans.component';

describe('CustomerLoansComponent', () => {
  let component: CustomerLoansComponent;
  let fixture: ComponentFixture<CustomerLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerLoansComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
