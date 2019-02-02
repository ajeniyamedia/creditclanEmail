import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPinComponent } from './rest-pin.component';

describe('RestPinComponent', () => {
  let component: RestPinComponent;
  let fixture: ComponentFixture<RestPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
