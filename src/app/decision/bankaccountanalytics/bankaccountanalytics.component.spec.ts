import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankaccountanalyticsComponent } from './bankaccountanalytics.component';

describe('BankaccountanalyticsComponent', () => {
  let component: BankaccountanalyticsComponent;
  let fixture: ComponentFixture<BankaccountanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankaccountanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankaccountanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
