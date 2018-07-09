import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountreportsComponent } from './accountreports.component';

describe('AccountreportsComponent', () => {
  let component: AccountreportsComponent;
  let fixture: ComponentFixture<AccountreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
