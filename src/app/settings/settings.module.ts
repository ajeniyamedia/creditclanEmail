import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from '../settings/settings.component';
import { SettingsdashboardComponent } from './settingsdashboard/settingsdashboard.component';
import { SettingsRoutingModule } from './settings-routing.module';
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent,
    SettingsdashboardComponent
  ]
})
export class SettingsModule { }
