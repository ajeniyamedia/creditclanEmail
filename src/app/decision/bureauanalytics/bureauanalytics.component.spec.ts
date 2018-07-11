import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauanalyticsComponent } from './bureauanalytics.component';

describe('BureauanalyticsComponent', () => {
  let component: BureauanalyticsComponent;
  let fixture: ComponentFixture<BureauanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BureauanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BureauanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
