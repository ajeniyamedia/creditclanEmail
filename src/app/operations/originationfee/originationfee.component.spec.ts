import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginationfeeComponent } from './originationfee.component';

describe('OriginationfeeComponent', () => {
  let component: OriginationfeeComponent;
  let fixture: ComponentFixture<OriginationfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginationfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginationfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
