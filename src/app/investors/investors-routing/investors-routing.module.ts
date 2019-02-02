import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InvestorsettingsComponent } from '../investorsettings/investorsettings.component';
import { AuthGuard } from '../../_guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: InvestorsettingsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: InvestorsettingsComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorsRoutingModule { }
