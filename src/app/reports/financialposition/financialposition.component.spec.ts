import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialpositionComponent } from './financialposition.component';

describe('FinancialpositionComponent', () => {
  let component: FinancialpositionComponent;
  let fixture: ComponentFixture<FinancialpositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialpositionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
