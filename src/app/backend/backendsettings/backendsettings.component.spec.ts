import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendsettingsComponent } from './backendsettings.component';

describe('BackendsettingsComponent', () => {
  let component: BackendsettingsComponent;
  let fixture: ComponentFixture<BackendsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
