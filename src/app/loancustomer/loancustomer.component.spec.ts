import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoancustomerComponent } from './loancustomer.component';

describe('LoancustomerComponent', () => {
  let component: LoancustomerComponent;
  let fixture: ComponentFixture<LoancustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoancustomerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoancustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
