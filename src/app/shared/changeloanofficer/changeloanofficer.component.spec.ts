import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeloanofficerComponent } from './changeloanofficer.component';

describe('ChangeloanofficerComponent', () => {
  let component: ChangeloanofficerComponent;
  let fixture: ComponentFixture<ChangeloanofficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeloanofficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeloanofficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
