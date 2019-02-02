import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdsettingsComponent } from './ussdsettings.component';

describe('UssdsettingsComponent', () => {
  let component: UssdsettingsComponent;
  let fixture: ComponentFixture<UssdsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UssdsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
