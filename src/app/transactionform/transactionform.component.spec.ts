import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionformComponent } from './transactionform.component';

describe('TransactionformComponent', () => {
  let component: TransactionformComponent;
  let fixture: ComponentFixture<TransactionformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionformComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
