import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoancustomerformComponent } from './loancustomerform.component';

describe('LoancustomerformComponent', () => {
  let component: LoancustomerformComponent;
  let fixture: ComponentFixture<LoancustomerformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoancustomerformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoancustomerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
