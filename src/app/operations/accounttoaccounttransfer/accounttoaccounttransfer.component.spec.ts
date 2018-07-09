import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccounttoaccounttransferComponent } from './accounttoaccounttransfer.component';

describe('AccounttoaccounttransferComponent', () => {
  let component: AccounttoaccounttransferComponent;
  let fixture: ComponentFixture<AccounttoaccounttransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccounttoaccounttransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccounttoaccounttransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
