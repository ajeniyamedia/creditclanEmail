import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSocialAnalysisComponent } from './customer-social-analysis.component';

describe('CustomerSocialAnalysisComponent', () => {
  let component: CustomerSocialAnalysisComponent;
  let fixture: ComponentFixture<CustomerSocialAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSocialAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSocialAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
