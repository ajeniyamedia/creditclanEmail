import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevcustomerComponent } from './prevcustomer.component';

describe('PrevcustomerComponent', () => {
  let component: PrevcustomerComponent;
  let fixture: ComponentFixture<PrevcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
