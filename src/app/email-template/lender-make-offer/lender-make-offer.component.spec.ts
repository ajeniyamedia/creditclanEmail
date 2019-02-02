import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderMakeOfferComponent } from './lender-make-offer.component';

describe('LenderMakeOfferComponent', () => {
  let component: LenderMakeOfferComponent;
  let fixture: ComponentFixture<LenderMakeOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderMakeOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderMakeOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
