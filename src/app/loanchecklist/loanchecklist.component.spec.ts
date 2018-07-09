import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanchecklistComponent } from './loanchecklist.component';

describe('LoanchecklistComponent', () => {
  let component: LoanchecklistComponent;
  let fixture: ComponentFixture<LoanchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
