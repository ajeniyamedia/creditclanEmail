import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementscheduleComponent } from './statementschedule.component';

describe('StatementscheduleComponent', () => {
  let component: StatementscheduleComponent;
  let fixture: ComponentFixture<StatementscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatementscheduleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
