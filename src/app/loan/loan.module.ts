import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { LoanroutingModule } from '../loan/loanrouting/loanrouting.module';
import { LoandetailsComponent } from '../loandetails'; 
import { LoancommentsComponent } from '../loancomments/index'; 
import { LoanrepaymentComponent } from '../loanrepayment/loanrepayment.component';
import { LoaneirComponent } from '../loaneir/loaneir.component';   
import { LoancustomerComponent } from '../loancustomer/loancustomer.component';
import { NextloanComponent } from '../nextloan/nextloan.component';

import { CustomeranalysisComponent } from '../customeranalysis/customeranalysis.component';
import { CustomerAnalysisDetailsComponent } from '../customer-analysis-details/customer-analysis-details.component';
import { CustomerAnalysisFullDetailsComponent } from '../customer-analysis-full-details/customer-analysis-full-details.component';
import { CustomerSocialAnalysisComponent } from '../customer-social-analysis/customer-social-analysis.component';
import { CustomerSocialAnalysisDetailsComponent } from '../customer-social-analysis-details/customer-social-analysis-details.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoanroutingModule
  ],
  declarations: [
    LoandetailsComponent, 
    LoancommentsComponent, 
    LoanrepaymentComponent,LoaneirComponent,NextloanComponent, 
    LoancustomerComponent,
    CustomeranalysisComponent, CustomerAnalysisDetailsComponent,CustomerAnalysisFullDetailsComponent,
    CustomerSocialAnalysisComponent,CustomerSocialAnalysisDetailsComponent,
  ]
})
export class LoanModule { }
