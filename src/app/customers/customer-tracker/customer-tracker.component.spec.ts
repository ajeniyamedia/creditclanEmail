import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTrackerComponent } from './customer-tracker.component';

describe('CustomerTrackerComponent', () => {
  let component: CustomerTrackerComponent;
  let fixture: ComponentFixture<CustomerTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerTrackerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
