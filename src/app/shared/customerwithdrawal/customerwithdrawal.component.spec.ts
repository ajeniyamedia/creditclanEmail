import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerwithdrawalComponent } from './customerwithdrawal.component';

describe('CustomerwithdrawalComponent', () => {
  let component: CustomerwithdrawalComponent;
  let fixture: ComponentFixture<CustomerwithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerwithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerwithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
