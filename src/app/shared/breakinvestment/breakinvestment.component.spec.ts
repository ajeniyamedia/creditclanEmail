import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakinvestmentComponent } from './breakinvestment.component';

describe('BreakinvestmentComponent', () => {
  let component: BreakinvestmentComponent;
  let fixture: ComponentFixture<BreakinvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakinvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakinvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
