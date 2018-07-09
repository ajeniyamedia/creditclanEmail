import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsgroupingComponent } from './bsgrouping.component';

describe('BsgroupingComponent', () => {
  let component: BsgroupingComponent;
  let fixture: ComponentFixture<BsgroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BsgroupingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsgroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
