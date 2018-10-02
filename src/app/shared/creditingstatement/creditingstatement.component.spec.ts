import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditingstatementComponent } from './creditingstatement.component';

describe('CreditingstatementComponent', () => {
  let component: CreditingstatementComponent;
  let fixture: ComponentFixture<CreditingstatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditingstatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditingstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
