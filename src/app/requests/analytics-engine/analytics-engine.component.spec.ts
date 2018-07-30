import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsEngineComponent } from './analytics-engine.component';

describe('AnalyticsEngineComponent', () => {
  let component: AnalyticsEngineComponent;
  let fixture: ComponentFixture<AnalyticsEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
