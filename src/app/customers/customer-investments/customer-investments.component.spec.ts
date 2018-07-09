import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInvestmentsComponent } from './customer-investments.component';

describe('CustomerInvestmentsComponent', () => {
  let component: CustomerInvestmentsComponent;
  let fixture: ComponentFixture<CustomerInvestmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInvestmentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
