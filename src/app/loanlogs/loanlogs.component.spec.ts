import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanlogsComponent } from './loanlogs.component';

describe('LoanlogsComponent', () => {
  let component: LoanlogsComponent;
  let fixture: ComponentFixture<LoanlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanlogsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
