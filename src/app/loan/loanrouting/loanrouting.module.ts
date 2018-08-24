import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoandetailsComponent } from '../../loandetails';

import { AuthGuard } from '../../_guards/auth.guard';
import { LoancontractComponent } from '../../loancontract';
import { LoanlendersComponent } from '../../loanlenders/index';
import { LoanapprovalsComponent } from '../../loanapprovals/index';
import { LoancommentsComponent } from '../../loancomments/index';
import { LoanguarantorsComponent } from '../../loanguarantors/index';
import { LoanrepaymentComponent } from '../../loanrepayment/loanrepayment.component';
import { LoaneirComponent } from '../../loaneir/loaneir.component';
import { LoanlogsComponent } from '../../loanlogs/loanlogs.component';
import { LoancustomerComponent } from '../../loancustomer/loancustomer.component';
import { LoanpeertopeerComponent } from '../../loanpeertopeer/loanpeertopeer.component';
import { LoanmoreComponent } from '../../loanmore/loanmore.component';
import { LoanphotosComponent } from '../../loanphotos/loanphotos.component';
import { LoananalysisComponent } from '../../loananalysis/loananalysis.component';
import { LoanacctsComponent } from '../../loanaccts/loanaccts.component';
import { LoanworkflowComponent } from '../../loanworkflow/loanworkflow.component';
import { LoancollateralComponent } from '../../loancollateral/loancollateral.component';
import { LoanprofileComponent } from '../../loanprofile/loanprofile.component';
import { LoanchequeComponent } from '../../loancheque/loancheque.component';
import { LoandocumentComponent } from '../../loandocument/loandocument.component';
import { LoanlocationComponent } from '../../loanlocation/loanlocation.component';
import { LoanchecklistComponent } from '../../loanchecklist/loanchecklist.component';
import { LoanchatComponent } from '../../loanchat/loanchat.component';
import { CustomeranalysisComponent } from '../../customeranalysis/customeranalysis.component';
import { CustomerAnalysisDetailsComponent } from '../../customer-analysis-details/customer-analysis-details.component';
import { CustomerAnalysisFullDetailsComponent } from '../../customer-analysis-full-details/customer-analysis-full-details.component';
import { CustomerSocialAnalysisComponent } from '../../customer-social-analysis/customer-social-analysis.component';
import { CustomerSocialAnalysisDetailsComponent } from '../../customer-social-analysis-details/customer-social-analysis-details.component';
import { LoanrejectionsComponent } from '../loanrejections/loanrejections.component';
import { LoankycComponent } from '../loankyc/loankyc.component';
import { CreditcheckComponent } from '../creditcheck/creditcheck.component';
import { ContractofferComponent } from '../../shared/contractoffer/contractoffer.component';
const routes: Routes = [
  {
    path: '', component: LoandetailsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', redirectTo: 'contract', pathMatch: 'full' },
      { path: 'customer-analysis', component: CustomeranalysisComponent },
      { path: 'customer-analysis-details', component: CustomerAnalysisDetailsComponent },
      { path: 'customer-analysis-fulldetails/:type', component: CustomerAnalysisFullDetailsComponent },
      { path: 'customer-social-analysis', component: CustomerSocialAnalysisComponent },
      { path: 'customer-social-analysis-details/:type', component: CustomerSocialAnalysisDetailsComponent },
      { path: 'contract', component: LoancontractComponent },
      { path: 'lenders', component: LoanlendersComponent },
      { path: 'approvals', component: LoanapprovalsComponent },
      { path: 'comments', component: LoancommentsComponent },
      { path: 'guarantors', component: LoanguarantorsComponent },
      { path: 'repayments', component: LoanrepaymentComponent },
      { path: 'eir', component: LoaneirComponent },
      { path: 'logs', component: LoanlogsComponent },
      { path: 'customer', component: LoancustomerComponent },
      { path: 'p2p', component: LoanpeertopeerComponent },
      { path: 'more', component: LoanmoreComponent },
      { path: 'photos', component: LoanphotosComponent },
      { path: 'analysis', component: LoananalysisComponent },
      { path: 'accts', component: LoanacctsComponent },
      { path: 'workflow', component: LoanworkflowComponent },
      { path: 'collateral', component: LoancollateralComponent },
      { path: 'profile', component: LoanprofileComponent },
      { path: 'cheque', component: LoanchequeComponent },
      { path: 'documents', component: LoandocumentComponent },
      { path: 'location', component: LoanlocationComponent },
      { path: 'checklist', component: LoanchecklistComponent },
      { path: 'chat', component: LoanchatComponent },
      { path: 'rejections', component: LoanrejectionsComponent },
      { path: 'creditcheck', component: CreditcheckComponent },
      { path: 'kyc', component: LoankycComponent },
      { path: 'offer', component: ContractofferComponent }
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanroutingModule { }
