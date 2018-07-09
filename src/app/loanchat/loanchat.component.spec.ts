import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanchatComponent } from './loanchat.component';

describe('LoanchatComponent', () => {
  let component: LoanchatComponent;
  let fixture: ComponentFixture<LoanchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
