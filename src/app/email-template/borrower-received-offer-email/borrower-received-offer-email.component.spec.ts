import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerReceivedOfferEmailComponent } from './borrower-received-offer-email.component';

describe('BorrowerReceivedOfferEmailComponent', () => {
  let component: BorrowerReceivedOfferEmailComponent;
  let fixture: ComponentFixture<BorrowerReceivedOfferEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowerReceivedOfferEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerReceivedOfferEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
