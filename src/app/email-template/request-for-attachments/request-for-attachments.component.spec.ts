import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForAttachmentsComponent } from './request-for-attachments.component';

describe('RequestForAttachmentsComponent', () => {
  let component: RequestForAttachmentsComponent;
  let fixture: ComponentFixture<RequestForAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
