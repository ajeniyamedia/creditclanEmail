import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatementdetailsComponent } from '../statement/statementdetails/statementdetails.component';
import { LoanstatementComponent } from '../loanstatement/loanstatement.component';
import { StatementscheduleComponent } from '../statementschedule/statementschedule.component';
import { LoanprofileComponent } from '../loanprofile/loanprofile.component';
import { LoancontractComponent } from '../loancontract/index';
import { AuthGuard } from '../_guards/auth.guard';
import { LoanchecklistComponent } from '../loanchecklist/loanchecklist.component';
import { LoanmoreComponent } from '../loanmore/loanmore.component';
import { LoanguarantorsComponent } from '../loanguarantors';
import { LoanlocationComponent } from '../loanlocation/loanlocation.component';
import { LoanchequeComponent } from '../loancheque/loancheque.component';
import { LoanphotosComponent } from '../loanphotos/loanphotos.component';
import { LoananalysisComponent } from '../loananalysis/loananalysis.component';
import { LoanapprovalsComponent } from '../loanapprovals';
import { LoandocumentComponent } from '../loandocument';
import { LoanacctsComponent } from '../loanaccts/loanaccts.component';
import { LoancollateralComponent } from '../loancollateral/loancollateral.component';
import { LoanlogsComponent } from '../loanlogs/loanlogs.component';
import { LoanpeertopeerComponent } from '../loanpeertopeer/loanpeertopeer.component';
import { LoanlendersComponent } from '../loanlenders';
import { DirectdebitComponent } from '../loan/directdebit/directdebit.component';

import { ContractofferComponent } from '../shared/contractoffer/contractoffer.component';
import { NotificationsComponent } from '../shared/notifications/notifications.component';
import { CreditcheckComponent } from '../loan/creditcheck/creditcheck.component';
import { TimelineComponent } from '../shared/timeline/timeline.component';
const routes: Routes = [
  {
    path: '',component: StatementdetailsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', redirectTo: 'statement', pathMatch: 'full' },
      { path: 'statement', component: LoanstatementComponent },
      { path: 'schedule', component: StatementscheduleComponent },
      { path: 'profile', component: LoanprofileComponent },
      { path: 'contract', component: LoancontractComponent },
      { path: 'checklist', component: LoanchecklistComponent },
      { path: 'more', component: LoanmoreComponent },
      { path: 'guarantors', component: LoanguarantorsComponent},
      { path: 'location', component: LoanlocationComponent},
      { path: 'cheque', component: LoanchequeComponent},
      { path: 'photos', component: LoanphotosComponent},
      { path: 'analysis', component: LoananalysisComponent},
      { path: 'approvals', component: LoanapprovalsComponent},
      { path: 'documents', component: LoandocumentComponent},
      { path: 'accts', component: LoanacctsComponent},
      { path: 'collateral', component: LoancollateralComponent},
      { path: 'logs', component: LoanlogsComponent},
      { path: 'p2p', component: LoanpeertopeerComponent},
      { path: 'lenders', component: LoanlendersComponent},
      { path: 'creditcheck', component: CreditcheckComponent},
      { path: 'directdebit', component: DirectdebitComponent},
      { path: 'customer_repayment', component: NotificationsComponent},
      { path: 'timeline', component: TimelineComponent},
      { path: 'offer' , component: ContractofferComponent}
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementroutingModule { }
