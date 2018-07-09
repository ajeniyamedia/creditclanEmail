import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournaldetailsComponent } from './journaldetails.component';

describe('JournaldetailsComponent', () => {
  let component: JournaldetailsComponent;
  let fixture: ComponentFixture<JournaldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournaldetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
