import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyremitaComponent } from './notifyremita.component';

describe('NotifyremitaComponent', () => {
  let component: NotifyremitaComponent;
  let fixture: ComponentFixture<NotifyremitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyremitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyremitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
