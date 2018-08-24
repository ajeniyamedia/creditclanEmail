import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectdebitcancelComponent } from './directdebitcancel.component';

describe('DirectdebitcancelComponent', () => {
  let component: DirectdebitcancelComponent;
  let fixture: ComponentFixture<DirectdebitcancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectdebitcancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectdebitcancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
