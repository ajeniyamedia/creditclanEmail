import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { RolesComponent } from './roles/roles.component';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { NewjournalComponent } from './newjournal/newjournal.component';
import { SettingsdashboardComponent } from './settingsdashboard/settingsdashboard.component';
import { UssdsettingsComponent } from './ussdsettings/ussdsettings.component';
import { AuthGuard } from '../_guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: OperationsComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: OperationsdashboardComponent, canActivate: [AuthGuard] },
      { path: 'disbursements', component: DisbursementsComponent },
      { path: 'calendar', component: Calendar, canActivate: [AuthGuard] },
      { path: 'banks', component: BanksComponent, canActivate: [AuthGuard] },
      { path: 'journal', component: JournalComponent, canActivate: [AuthGuard] },
      { path: 'queue', component: QueueComponent, canActivate: [AuthGuard] },
      { path: 'journal/:id', component: JournaldetailsComponent, canActivate: [AuthGuard] },
      { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
      { path: 'customer_wallet', component: CustomerwalletComponent, canActivate: [AuthGuard] },
      { path: 'chart_of_accounts', component: ChartOfAccountsComponent, canActivate: [AuthGuard] },
      { path: 'employees', component: EmployeeComponent, canActivate: [AuthGuard] },
      { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
      {path:'settings', component:SettingsdashboardComponent}, 
      {path:'ussd', component:UssdsettingsComponent},

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
