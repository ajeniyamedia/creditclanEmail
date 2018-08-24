import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { LoanroutingModule } from '../loan/loanrouting/loanrouting.module';
import { LoandetailsComponent } from '../loandetails';
import { LoancommentsComponent } from '../loancomments/index';
import { LoaneirComponent } from '../loaneir/loaneir.component';
import { LoancustomerComponent } from '../loancustomer/loancustomer.component';
import { NextloanComponent } from '../nextloan/nextloan.component';

import { CustomeranalysisComponent } from '../customeranalysis/customeranalysis.component';
import { CustomerAnalysisDetailsComponent } from '../customer-analysis-details/customer-analysis-details.component';
import { CustomerAnalysisFullDetailsComponent } from '../customer-analysis-full-details/customer-analysis-full-details.component';
import { CustomerSocialAnalysisComponent } from '../customer-social-analysis/customer-social-analysis.component';
import { CustomerSocialAnalysisDetailsComponent } from '../customer-social-analysis-details/customer-social-analysis-details.component';
import { LoanrejectionsComponent } from './loanrejections/loanrejections.component';
import { LoankycComponent } from './loankyc/loankyc.component';
import { CreditclananalyticsComponent } from './creditclananalytics/creditclananalytics.component';
// import { CreditcheckComponent } from './creditcheck/creditcheck.component';
// import { AdjustweightsComponent } from './adjustweights/adjustweights.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoanroutingModule
  ],
  declarations: [
    LoandetailsComponent,
    LoancommentsComponent,
     LoaneirComponent, NextloanComponent,
    LoancustomerComponent,
    CustomeranalysisComponent, CustomerAnalysisDetailsComponent, CustomerAnalysisFullDetailsComponent,
    CustomerSocialAnalysisComponent, CustomerSocialAnalysisDetailsComponent, LoanrejectionsComponent,
    LoankycComponent, CreditclananalyticsComponent

  ]
})
export class LoanModule { }
