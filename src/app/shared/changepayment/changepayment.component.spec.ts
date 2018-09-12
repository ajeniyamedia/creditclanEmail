import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepaymentComponent } from './changepayment.component';

describe('ChangepaymentComponent', () => {
  let component: ChangepaymentComponent;
  let fixture: ComponentFixture<ChangepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
