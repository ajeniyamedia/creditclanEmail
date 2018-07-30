import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditclananalyticsComponent } from './creditclananalytics.component';

describe('CreditclananalyticsComponent', () => {
  let component: CreditclananalyticsComponent;
  let fixture: ComponentFixture<CreditclananalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditclananalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditclananalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
