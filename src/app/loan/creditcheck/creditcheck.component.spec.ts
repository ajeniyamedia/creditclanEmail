import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcheckComponent } from './creditcheck.component';

describe('CreditcheckComponent', () => {
  let component: CreditcheckComponent;
  let fixture: ComponentFixture<CreditcheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditcheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
