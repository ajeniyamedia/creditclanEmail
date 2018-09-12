import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from '../security/security/security.component'; 
import { AuthGuard } from '../_guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: SecurityComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: SecurityComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
