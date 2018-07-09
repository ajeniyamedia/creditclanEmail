import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentscheduleComponent } from './investmentschedule.component';

describe('InvestmentscheduleComponent', () => {
  let component: InvestmentscheduleComponent;
  let fixture: ComponentFixture<InvestmentscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentscheduleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
