import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustweightsComponent } from './adjustweights.component';

describe('AdjustweightsComponent', () => {
  let component: AdjustweightsComponent;
  let fixture: ComponentFixture<AdjustweightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustweightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustweightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
