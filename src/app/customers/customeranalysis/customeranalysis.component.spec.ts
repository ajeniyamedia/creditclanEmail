import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeranalysisComponent } from './customeranalysis.component';

describe('CustomeranalysisComponent', () => {
  let component: CustomeranalysisComponent;
  let fixture: ComponentFixture<CustomeranalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeranalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeranalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
