import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeloanpaymentComponent } from './makeloanpayment.component';

describe('MakeloanpaymentComponent', () => {
  let component: MakeloanpaymentComponent;
  let fixture: ComponentFixture<MakeloanpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeloanpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeloanpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
