import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuerepaymentComponent } from './duerepayment.component';

describe('DuerepaymentComponent', () => {
  let component: DuerepaymentComponent;
  let fixture: ComponentFixture<DuerepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuerepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuerepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
