import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsearchComponent } from './empsearch.component';

describe('EmpsearchComponent', () => {
  let component: EmpsearchComponent;
  let fixture: ComponentFixture<EmpsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
