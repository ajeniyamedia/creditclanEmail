import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueLoansComponent } from './due-loans.component';

describe('DueLoansComponent', () => {
  let component: DueLoansComponent;
  let fixture: ComponentFixture<DueLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DueLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DueLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
