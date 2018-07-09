import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAnalysisFullDetailsComponent } from './customer-analysis-full-details.component';

describe('CustomerAnalysisFullDetailsComponent', () => {
  let component: CustomerAnalysisFullDetailsComponent;
  let fixture: ComponentFixture<CustomerAnalysisFullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAnalysisFullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAnalysisFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
