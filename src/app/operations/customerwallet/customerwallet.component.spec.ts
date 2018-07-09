import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerwalletComponent } from './customerwallet.component';

describe('CustomerwalletComponent', () => {
  let component: CustomerwalletComponent;
  let fixture: ComponentFixture<CustomerwalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerwalletComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerwalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
