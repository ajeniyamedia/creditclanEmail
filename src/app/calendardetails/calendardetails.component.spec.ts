import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendardetailsComponent } from './calendardetails.component';

describe('CalendardetailsComponent', () => {
  let component: CalendardetailsComponent;
  let fixture: ComponentFixture<CalendardetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendardetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendardetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
