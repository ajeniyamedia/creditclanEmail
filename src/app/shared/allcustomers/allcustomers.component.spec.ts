import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcustomersComponent } from './allcustomers.component';

describe('AllcustomersComponent', () => {
  let component: AllcustomersComponent;
  let fixture: ComponentFixture<AllcustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
