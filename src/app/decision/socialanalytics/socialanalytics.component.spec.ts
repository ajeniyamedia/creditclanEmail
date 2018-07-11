import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialanalyticsComponent } from './socialanalytics.component';

describe('SocialanalyticsComponent', () => {
  let component: SocialanalyticsComponent;
  let fixture: ComponentFixture<SocialanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
