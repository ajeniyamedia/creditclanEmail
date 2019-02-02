import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UssdsettingsComponent } from '../ussd/ussdsettings/ussdsettings.component';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: UssdsettingsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: UssdsettingsComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UssdRoutingModule { }
