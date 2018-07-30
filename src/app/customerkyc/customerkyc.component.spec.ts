import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerkycComponent } from './customerkyc.component';

describe('CustomerkycComponent', () => {
  let component: CustomerkycComponent;
  let fixture: ComponentFixture<CustomerkycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerkycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerkycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
