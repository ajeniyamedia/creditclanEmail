import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { PickupComponent } from '../pickup/pickup/pickup.component';
import { DashboardComponent } from '../pickup/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '', component: PickupComponent, canActivate: [AuthGuard],

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
export class PickupRoutingModule { }
