import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementdetailsComponent } from './statementdetails.component';

describe('StatementdetailsComponent', () => {
  let component: StatementdetailsComponent;
  let fixture: ComponentFixture<StatementdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
