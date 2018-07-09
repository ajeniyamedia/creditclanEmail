import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalreportsComponent } from './journalreports.component';

describe('JournalreportsComponent', () => {
  let component: JournalreportsComponent;
  let fixture: ComponentFixture<JournalreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalreportsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
