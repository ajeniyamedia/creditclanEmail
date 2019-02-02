import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdChatComponent } from './ussd-chat.component';

describe('UssdChatComponent', () => {
  let component: UssdChatComponent;
  let fixture: ComponentFixture<UssdChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UssdChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
