import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorRequestEmailComponent } from './guarantor-request-email.component';

describe('GuarantorRequestEmailComponent', () => {
  let component: GuarantorRequestEmailComponent;
  let fixture: ComponentFixture<GuarantorRequestEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantorRequestEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorRequestEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
