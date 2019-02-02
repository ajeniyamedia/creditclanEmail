import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerAccpectedOfferLetterComponent } from './borrower-accpected-offer-letter.component';

describe('BorrowerAccpectedOfferLetterComponent', () => {
  let component: BorrowerAccpectedOfferLetterComponent;
  let fixture: ComponentFixture<BorrowerAccpectedOfferLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowerAccpectedOfferLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerAccpectedOfferLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
