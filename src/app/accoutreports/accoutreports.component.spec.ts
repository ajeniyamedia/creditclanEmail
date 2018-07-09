import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutreportsComponent } from './accoutreports.component';

describe('AccoutreportsComponent', () => {
  let component: AccoutreportsComponent;
  let fixture: ComponentFixture<AccoutreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccoutreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoutreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
