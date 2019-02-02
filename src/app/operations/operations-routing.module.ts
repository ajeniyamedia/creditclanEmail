import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from '../operations/operations.component';
import { OperationsdashboardComponent } from './operationsdashboard/operationsdashboard.component';
import { SettingsdashboardComponent } from './settingsdashboard/settingsdashboard.component';
import { UssdsettingsComponent } from './ussdsettings/ussdsettings.component';
import { AuthGuard } from '../_guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: OperationsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: OperationsdashboardComponent, canActivate: [AuthGuard] },
      {path:'settings', component:SettingsdashboardComponent}, 
      {path:'ussd', component:UssdsettingsComponent},

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
