import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { InvestmentComponent } from '../investment/investment.component';
import { InvestmentborrowerComponent } from '../investmentborrower/investmentborrower.component';
import { InvestmentscheduleComponent } from '../investmentschedule/investmentschedule.component';
import { InvestmentdetailsComponent } from '../investmentdetails/investmentdetails.component';

import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '',component: InvestmentdetailsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', redirectTo: 'statement', pathMatch: 'full' },
      { path: 'statement', component: InvestmentComponent },
      { path: 'schedule', component: InvestmentscheduleComponent },
      { path: 'borrower', component: InvestmentborrowerComponent }, 
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentroutingModule { }
