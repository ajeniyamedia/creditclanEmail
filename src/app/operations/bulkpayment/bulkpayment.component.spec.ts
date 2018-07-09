import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkpaymentComponent } from './bulkpayment.component';

describe('BulkpaymentComponent', () => {
  let component: BulkpaymentComponent;
  let fixture: ComponentFixture<BulkpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
