import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementprofileComponent } from './statementprofile.component';

describe('StatementprofileComponent', () => {
  let component: StatementprofileComponent;
  let fixture: ComponentFixture<StatementprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatementprofileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
