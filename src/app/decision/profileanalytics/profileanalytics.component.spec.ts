import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileanalyticsComponent } from './profileanalytics.component';

describe('ProfileanalyticsComponent', () => {
  let component: ProfileanalyticsComponent;
  let fixture: ComponentFixture<ProfileanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
