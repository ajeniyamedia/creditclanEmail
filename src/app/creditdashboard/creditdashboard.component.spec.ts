import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditdashboardComponent } from './creditdashboard.component';

describe('CreditdashboardComponent', () => {
  let component: CreditdashboardComponent;
  let fixture: ComponentFixture<CreditdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
