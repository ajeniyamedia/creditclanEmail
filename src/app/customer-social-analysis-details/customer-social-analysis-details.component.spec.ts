import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSocialAnalysisDetailsComponent } from './customer-social-analysis-details.component';

describe('CustomerSocialAnalysisDetailsComponent', () => {
  let component: CustomerSocialAnalysisDetailsComponent;
  let fixture: ComponentFixture<CustomerSocialAnalysisDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSocialAnalysisDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSocialAnalysisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
