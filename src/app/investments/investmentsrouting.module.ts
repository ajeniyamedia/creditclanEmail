import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { InvestmentsComponent } from '../investments/investments.component';
const routes: Routes = [
  {
    path: '', component: InvestmentsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: InvestmentsComponent, canActivate: [AuthGuard] }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsroutingModule { }
