import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerverificationsComponent } from './customerverifications.component';

describe('CustomerverificationsComponent', () => {
  let component: CustomerverificationsComponent;
  let fixture: ComponentFixture<CustomerverificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerverificationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerverificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
