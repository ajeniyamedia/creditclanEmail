import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextcustomerComponent } from './nextcustomer.component';

describe('NextcustomerComponent', () => {
  let component: NextcustomerComponent;
  let fixture: ComponentFixture<NextcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
