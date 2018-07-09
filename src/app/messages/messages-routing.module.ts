import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { MessagesComponent } from '../messages/messages.component';
import { DashboardComponent } from '../messages/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '', component: MessagesComponent, canActivate: [AuthGuard],

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
export class MessagesRoutingModule { }
