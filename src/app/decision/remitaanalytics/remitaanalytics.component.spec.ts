import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitaanalyticsComponent } from './remitaanalytics.component';

describe('RemitaanalyticsComponent', () => {
  let component: RemitaanalyticsComponent;
  let fixture: ComponentFixture<RemitaanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemitaanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitaanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
