import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentportfolioComponent } from './investmentportfolio.component';

describe('InvestmentportfolioComponent', () => {
  let component: InvestmentportfolioComponent;
  let fixture: ComponentFixture<InvestmentportfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentportfolioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
