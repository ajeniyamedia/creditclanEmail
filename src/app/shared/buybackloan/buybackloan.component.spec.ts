import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuybackloanComponent } from './buybackloan.component';

describe('BuybackloanComponent', () => {
  let component: BuybackloanComponent;
  let fixture: ComponentFixture<BuybackloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuybackloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuybackloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
