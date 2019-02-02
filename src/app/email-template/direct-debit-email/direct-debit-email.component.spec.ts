import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDebitEmailComponent } from './direct-debit-email.component';

describe('DirectDebitEmailComponent', () => {
  let component: DirectDebitEmailComponent;
  let fixture: ComponentFixture<DirectDebitEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectDebitEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDebitEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
