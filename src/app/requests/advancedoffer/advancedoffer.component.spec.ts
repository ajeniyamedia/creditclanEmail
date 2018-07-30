import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedofferComponent } from './advancedoffer.component';

describe('AdvancedofferComponent', () => {
  let component: AdvancedofferComponent;
  let fixture: ComponentFixture<AdvancedofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
