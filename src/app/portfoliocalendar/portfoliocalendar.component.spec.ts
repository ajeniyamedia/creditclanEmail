import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliocalendarComponent } from './portfoliocalendar.component';

describe('PortfoliocalendarComponent', () => {
  let component: PortfoliocalendarComponent;
  let fixture: ComponentFixture<PortfoliocalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfoliocalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfoliocalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
