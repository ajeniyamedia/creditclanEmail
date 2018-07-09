import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceddecisionComponent } from './advanceddecision.component';

describe('AdvanceddecisionComponent', () => {
  let component: AdvanceddecisionComponent;
  let fixture: ComponentFixture<AdvanceddecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceddecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceddecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
