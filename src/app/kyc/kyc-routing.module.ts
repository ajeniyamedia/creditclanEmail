import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { KycComponent } from '../kyc/kyc.component';
import { DashboardComponent } from '../kyc/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '', component: KycComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycRoutingModule { }
