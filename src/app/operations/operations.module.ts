import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { OperationsComponent } from '../operations/operations.component';
import { OperationsdashboardComponent } from './operationsdashboard/operationsdashboard.component';
import { DisbursementsComponent } from './disbursements/disbursements.component';
import { BanksComponent } from './banks/banks.component';
import { JournalComponent } from './journal/journal.component';
import { JournaldetailsComponent } from './journaldetails/journaldetails.component';
import { Calendar } from './calendar/calendar.component';
import { QueueComponent } from './queue/queue.component';
import { WalletComponent } from './wallet/wallet.component';
import { CustomerwalletComponent } from './customerwallet/customerwallet.component';
import { EmployeeComponent } from './employee/employee.component';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';

// import { NewbankformComponent } from '../newbankform/newbankform.component';
//import { LedgerComponent } from '../ledger/ledger.component';
import { NewjournalComponent } from './newjournal/newjournal.component';  
// import { PaymentComponent } from '../payment/payment.component';
import { WallettransferComponent } from '../wallettransfer/wallettransfer.component';
// import { NewempformComponent } from '../newempform/newempform.component'; 
import { NewaccountComponent } from '../newaccount/newaccount.component';
import { TransactionformComponent } from '../transactionform/transactionform.component'; 
import { SettingsdashboardComponent } from './settingsdashboard/settingsdashboard.component';
import { UssdsettingsComponent } from './ussdsettings/ussdsettings.component';
import { OperationsRoutingModule } from './operations-routing.module';
import { RolesComponent } from './roles/roles.component';
import { NewroleComponent } from './newrole/newrole.component';
import { AccounttoaccounttransferComponent } from './accounttoaccounttransfer/accounttoaccounttransfer.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { SimpledecisionComponent } from './simpledecision/simpledecision.component';
// import { GeneralformComponent } from './generalform/generalform.component';
// import { InterestformComponent } from './interestform/interestform.component';
// import { LoanamountComponent } from './loanamount/loanamount.component';
// import { InterestratefloorComponent } from './interestratefloor/interestratefloor.component';
// import { OriginationfeeComponent } from './originationfee/originationfee.component';
// import { BulkpaymentComponent } from './bulkpayment/bulkpayment.component';
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    OperationsRoutingModule
  ],
  declarations: [
    OperationsComponent,
    OperationsdashboardComponent, 
    TransactionformComponent,
    NewaccountComponent,
    DisbursementsComponent, //NewempformComponent,
    BanksComponent,
    JournalComponent,
    JournaldetailsComponent,
    Calendar,
    // PaymentComponent,
    QueueComponent,
    WalletComponent, WallettransferComponent, 
    CustomerwalletComponent,
    EmployeeComponent,
    ChartOfAccountsComponent,
    //LedgerComponent,
    //NewbankformComponent,
    NewjournalComponent, 
    SettingsdashboardComponent,
    UssdsettingsComponent,
    RolesComponent,
    NewroleComponent,
    AccounttoaccounttransferComponent,
    WithdrawalComponent,
    SimpledecisionComponent,
    //GeneralformComponent,
    // InterestformComponent,
    // LoanamountComponent,
    // InterestratefloorComponent,
    // OriginationfeeComponent,
    // BulkpaymentComponent,
  ]
})
export class OperationsModule { }
