import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsdashboardComponent } from './settingsdashboard.component';

describe('SettingsdashboardComponent', () => {
  let component: SettingsdashboardComponent;
  let fixture: ComponentFixture<SettingsdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsdashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
