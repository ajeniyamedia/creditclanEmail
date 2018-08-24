import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcheckdetailsComponent } from './creditcheckdetails.component';

describe('CreditcheckdetailsComponent', () => {
  let component: CreditcheckdetailsComponent;
  let fixture: ComponentFixture<CreditcheckdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditcheckdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditcheckdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
