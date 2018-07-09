import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbankformComponent } from './newbankform.component';

describe('NewbankformComponent', () => {
  let component: NewbankformComponent;
  let fixture: ComponentFixture<NewbankformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewbankformComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbankformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
