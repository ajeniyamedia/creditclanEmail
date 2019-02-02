import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsdashboardComponent } from './operationsdashboard.component';

describe('OperationsdashboardComponent', () => {
  let component: OperationsdashboardComponent;
  let fixture: ComponentFixture<OperationsdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperationsdashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
