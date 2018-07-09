import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentmaturityComponent } from './investmentmaturity.component';

describe('InvestmentmaturityComponent', () => {
  let component: InvestmentmaturityComponent;
  let fixture: ComponentFixture<InvestmentmaturityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentmaturityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentmaturityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
