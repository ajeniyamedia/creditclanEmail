import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectdebitComponent } from './directdebit.component';

describe('DirectdebitComponent', () => {
  let component: DirectdebitComponent;
  let fixture: ComponentFixture<DirectdebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectdebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectdebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
