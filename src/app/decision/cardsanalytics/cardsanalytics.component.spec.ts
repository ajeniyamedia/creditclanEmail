import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsanalyticsComponent } from './cardsanalytics.component';

describe('CardsanalyticsComponent', () => {
  let component: CardsanalyticsComponent;
  let fixture: ComponentFixture<CardsanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
