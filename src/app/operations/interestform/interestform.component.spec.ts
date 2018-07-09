import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestformComponent } from './interestform.component';

describe('InterestformComponent', () => {
  let component: InterestformComponent;
  let fixture: ComponentFixture<InterestformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
