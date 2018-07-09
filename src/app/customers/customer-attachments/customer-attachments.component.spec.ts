import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAttachmentsComponent } from './customer-attachments.component';

describe('CustomerAttachmentsComponent', () => {
  let component: CustomerAttachmentsComponent;
  let fixture: ComponentFixture<CustomerAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAttachmentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
