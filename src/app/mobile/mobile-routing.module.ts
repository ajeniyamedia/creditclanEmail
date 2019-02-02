import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MobileComponent } from '../mobile/mobile/mobile.component';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: MobileComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: MobileComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
