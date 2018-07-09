import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextloanComponent } from './nextloan.component';

describe('NextloanComponent', () => {
  let component: NextloanComponent;
  let fixture: ComponentFixture<NextloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
