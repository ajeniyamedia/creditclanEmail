import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakloanComponent } from './breakloan.component';

describe('BreakloanComponent', () => {
  let component: BreakloanComponent;
  let fixture: ComponentFixture<BreakloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreakloanComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
