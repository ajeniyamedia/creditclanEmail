import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentanalyticsComponent } from './repaymentanalytics.component';

describe('RepaymentanalyticsComponent', () => {
  let component: RepaymentanalyticsComponent;
  let fixture: ComponentFixture<RepaymentanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaymentanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
