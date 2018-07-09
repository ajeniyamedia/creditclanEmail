import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalviewComponent } from './approvalview.component';

describe('ApprovalviewComponent', () => {
  let component: ApprovalviewComponent;
  let fixture: ComponentFixture<ApprovalviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
