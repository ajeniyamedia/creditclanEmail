import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from '../reports/reports.component';
import { ReportsdashboardComponent } from './reportsdashboard/reportsdashboard.component';
import { LoanageingprofileComponent } from './loanageingprofile/loanageingprofile.component';
import { TrialbalanceComponent } from './trialbalance/trialbalance.component'
import { IncomestatementComponent } from './incomestatement/incomestatement.component';
import { FinancialpositionComponent } from './financialposition/financialposition.component';
import { GeneralledgerComponent } from './generalledger/generalledger.component';
import { PlgroupingComponent } from './plgrouping/plgrouping.component'
import { BsgroupingComponent } from './bsgrouping/bsgrouping.component'
import { InvestmentportfolioComponent } from './investmentportfolio/investmentportfolio.component';
import { InvestmentmaturityComponent } from './investmentmaturity/investmentmaturity.component';
import { InvestmentrateComponent } from './investmentrate/investmentrate.component';
import { LoanportfolioComponent } from './loanportfolio/loanportfolio.component';
import { LoanmaturityComponent } from './loanmaturity/loanmaturity.component';
import { JournalreportsComponent } from './journalreports/journalreports.component';

import { BorrowersreportComponent } from './borrowersreport/borrowersreport.component';
import { CollectionsreportComponent } from './collectionsreport/collectionsreport.component';
import { DefferedincomereportComponent } from './defferedincomereport/defferedincomereport.component';
import { DisbursmentreportComponent } from './disbursmentreport/disbursmentreport.component';
import { FeesreportComponent } from './feesreport/feesreport.component';
import { LoanofficerreportComponent } from './loanofficerreport/loanofficerreport.component';
import { ParreportComponent } from './parreport/parreport.component';

// Mr. Femi Routes
import { DueLoansComponent } from './due-loans/due-loans.component';
import { MissedRepaymentComponent } from './missed-repayment/missed-repayment.component';
import { NoRepaymentComponent } from './no-repayment/no-repayment.component';
import { PastMaturityComponent } from './past-maturity/past-maturity.component';
import { GuarantorsComponent } from './guarantors/guarantors.component';
import { RepaymentsComponent } from './repayments/repayments.component';

import { AuthGuard } from '../_guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: ReportsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: ReportsdashboardComponent, canActivate: [AuthGuard] },
      { path: 'investment_portfolio', component: InvestmentportfolioComponent },
      { path: 'investment_maturity_profile', component: InvestmentmaturityComponent },
      { path: 'investment_rate_history', component: InvestmentrateComponent },
      { path: 'loan_portfolio', component: LoanportfolioComponent },
      { path: 'loan_ageing_profile', component: LoanageingprofileComponent },
      { path: 'loan_maturity_profile', component: LoanmaturityComponent },
      { path: 'journal_reports', component: JournalreportsComponent },
      { path: 'trial_balance', component: TrialbalanceComponent },
      { path: 'income_statement', component: IncomestatementComponent },
      { path: 'financial_position', component: FinancialpositionComponent },
      { path: 'general_ledger', component: GeneralledgerComponent },
      { path: 'pl_grouping', component: PlgroupingComponent },
      { path: 'balance_sheet_grouping', component: BsgroupingComponent },

      { path: 'collections_report', component: CollectionsreportComponent },
      { path: 'deffered_income_report', component: DefferedincomereportComponent },
      { path: 'fees_report', component: FeesreportComponent },
      { path: 'par_report', component: ParreportComponent },

      // Mr. Femi Routes
      { path: 'due_loans', component: DueLoansComponent },
      { path: 'missed_repayment', component: MissedRepaymentComponent },
      { path: 'no_repayment', component: NoRepaymentComponent },
      { path: 'past_maturity', component: PastMaturityComponent },
      { path: 'guarantors', component: GuarantorsComponent },
      { path: 'repayments', component: RepaymentsComponent },
      { path: 'borrowers_report', component: BorrowersreportComponent },
      { path: 'disbursement_report', component: DisbursmentreportComponent },
      { path: 'loanofficer_report', component: LoanofficerreportComponent },


    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
