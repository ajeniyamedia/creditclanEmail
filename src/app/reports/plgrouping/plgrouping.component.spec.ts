import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlgroupingComponent } from './plgrouping.component';

describe('PlgroupingComponent', () => {
  let component: PlgroupingComponent;
  let fixture: ComponentFixture<PlgroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlgroupingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlgroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
