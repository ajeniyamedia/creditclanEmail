import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
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
import { ReportsRoutingModule } from './reports-routing.module';

import { CollectionsreportComponent } from './collectionsreport/collectionsreport.component';
import { DefferedincomereportComponent } from './defferedincomereport/defferedincomereport.component';
import { FeesreportComponent } from './feesreport/feesreport.component';
import { ParreportComponent } from './parreport/parreport.component';

// Mr. Femi Routes
import { DueLoansComponent } from './due-loans/due-loans.component';
import { MissedRepaymentComponent } from './missed-repayment/missed-repayment.component';
import { NoRepaymentComponent } from './no-repayment/no-repayment.component';
import { PastMaturityComponent } from './past-maturity/past-maturity.component';
import { GuarantorsComponent } from './guarantors/guarantors.component';
import { RepaymentsComponent } from './repayments/repayments.component';
import { BorrowersreportComponent } from './borrowersreport/borrowersreport.component';
import { DisbursmentreportComponent } from './disbursmentreport/disbursmentreport.component';
import { LoanofficerreportComponent } from './loanofficerreport/loanofficerreport.component';
import { AllcustomersComponent } from './allcustomers/allcustomers.component';
import { PaidloanComponent } from './paidloan/paidloan.component';
import { AutodebitComponent } from './autodebit/autodebit.component';



@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ReportsRoutingModule
  ],
  declarations: [
    ReportsComponent,
    ReportsdashboardComponent,
    LoanageingprofileComponent,
    TrialbalanceComponent,
    IncomestatementComponent,
    FinancialpositionComponent, GeneralledgerComponent,
    PlgroupingComponent,
    BsgroupingComponent,
    InvestmentportfolioComponent,
    InvestmentmaturityComponent,
    InvestmentrateComponent,
    LoanportfolioComponent,
    LoanmaturityComponent,
    JournalreportsComponent,

    BorrowersreportComponent,
    CollectionsreportComponent,
    DefferedincomereportComponent,
    DisbursmentreportComponent,
    FeesreportComponent,
    LoanofficerreportComponent,
    ParreportComponent,
    DueLoansComponent,
    MissedRepaymentComponent,
    NoRepaymentComponent,
    PastMaturityComponent,
    GuarantorsComponent,
    RepaymentsComponent,
    AllcustomersComponent,
    PaidloanComponent,
    AutodebitComponent
  ]
})
export class ReportsModule { }
