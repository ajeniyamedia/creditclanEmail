import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentborrowerComponent } from './investmentborrower.component';

describe('InvestmentborrowerComponent', () => {
  let component: InvestmentborrowerComponent;
  let fixture: ComponentFixture<InvestmentborrowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentborrowerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentborrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
