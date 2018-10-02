import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearingfinesComponent } from './clearingfines.component';

describe('ClearingfinesComponent', () => {
  let component: ClearingfinesComponent;
  let fixture: ComponentFixture<ClearingfinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearingfinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearingfinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
