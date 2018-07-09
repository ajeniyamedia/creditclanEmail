import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAnalysisDetailsComponent } from './customer-analysis-details.component';

describe('CustomerAnalysisDetailsComponent', () => {
  let component: CustomerAnalysisDetailsComponent;
  let fixture: ComponentFixture<CustomerAnalysisDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAnalysisDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAnalysisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
