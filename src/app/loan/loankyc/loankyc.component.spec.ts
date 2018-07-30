import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoankycComponent } from './loankyc.component';

describe('LoankycComponent', () => {
  let component: LoankycComponent;
  let fixture: ComponentFixture<LoankycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoankycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoankycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
