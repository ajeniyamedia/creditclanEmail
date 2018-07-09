import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidloanComponent } from './paidloan.component';

describe('PaidloanComponent', () => {
  let component: PaidloanComponent;
  let fixture: ComponentFixture<PaidloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
