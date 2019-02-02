import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { SettingsdashboardComponent } from './settingsdashboard/settingsdashboard.component';
import { AuthGuard } from '../_guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: SettingsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: SettingsdashboardComponent, canActivate: [AuthGuard] },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
