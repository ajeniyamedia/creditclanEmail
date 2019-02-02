import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvnVerificationEmailComponent } from './bvn-verification-email.component';

describe('BvnVerificationEmailComponent', () => {
  let component: BvnVerificationEmailComponent;
  let fixture: ComponentFixture<BvnVerificationEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvnVerificationEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvnVerificationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
