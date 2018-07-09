import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DecisionComponent } from '../decision/decision.component';
import { AuthGuard } from '../../_guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: DecisionComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: DecisionComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecisionRoutingModule { }