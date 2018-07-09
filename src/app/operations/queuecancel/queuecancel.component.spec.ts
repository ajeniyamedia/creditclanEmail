import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuecancelComponent } from './queuecancel.component';

describe('QueuecancelComponent', () => {
  let component: QueuecancelComponent;
  let fixture: ComponentFixture<QueuecancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuecancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuecancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
