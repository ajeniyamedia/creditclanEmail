import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from '../change-password.component'; 
import { AuthGuard } from '../../_guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: ChangePasswordComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: ChangePasswordComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }
