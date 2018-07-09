import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpledecisionComponent } from './simpledecision.component';

describe('SimpledecisionComponent', () => {
  let component: SimpledecisionComponent;
  let fixture: ComponentFixture<SimpledecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpledecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpledecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
