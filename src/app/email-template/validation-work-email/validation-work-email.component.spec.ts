import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationWorkEmailComponent } from './validation-work-email.component';

describe('ValidationWorkEmailComponent', () => {
  let component: ValidationWorkEmailComponent;
  let fixture: ComponentFixture<ValidationWorkEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationWorkEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationWorkEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
