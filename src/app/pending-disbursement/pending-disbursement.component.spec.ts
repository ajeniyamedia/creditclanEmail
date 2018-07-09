import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDisbursementComponent } from './pending-disbursement.component';

describe('PendingDisbursementComponent', () => {
  let component: PendingDisbursementComponent;
  let fixture: ComponentFixture<PendingDisbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PendingDisbursementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
