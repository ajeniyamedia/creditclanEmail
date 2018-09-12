import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CustomerdetailsComponent } from '../customerdetails/customerdetails.component';
import { CustomerProfileComponent } from '../customers/customer-profile/customer-profile.component';
import { CustomerAttachmentsComponent } from '../customers/customer-attachments/customer-attachments.component';
// import { CustomerMessagesComponent } from '../customers/customer-messages/customer-messages.component';
import { CustomerFinanceComponent } from '../customers/customer-finance/customer-finance.component';
import { CustomerverificationsComponent } from '../customers/customerverifications/customerverifications.component';
import { CustomerguarantorsComponent } from '../customers/customerguarantors/customerguarantors.component';
import { CustomerLoansComponent } from '../customers/customer-loans/customer-loans.component';
import { CustomerInvestmentsComponent } from '../customers/customer-investments/customer-investments.component';
import { CustomerAccountSettingsComponent } from '../customers/customer-account-settings/customer-account-settings.component';
import { CustomerTrackerComponent } from '../customers/customer-tracker/customer-tracker.component'; 
import { CustomerSocialComponent } from '../customers/customer-social/customer-social.component';
import { CustomerBankComponent } from '../customers/customer-bank/customer-bank.component';
import { CustomerScheduleComponent } from '../customers/customer-schedule/customer-schedule.component';
import { CustomerWalletComponent } from '../customers/customer-wallet/customer-wallet.component';
import { CustomerPhotosComponent } from '../customers/customer-photos/customer-photos.component';
import { ReferralsComponent } from '../customers/referrals/referrals.component';
import { InterestComponent } from '../customers/interest/interest.component';
import { UsersComponent } from '../customers/users/users.component';

import { AuthGuard } from '../_guards/auth.guard';
import { CorporatePeopleComponent } from '../customers/corporate-people/corporate-people.component';
import { LoankycComponent } from '../loan/loankyc/loankyc.component';
import { CustomerkycComponent } from '../customerkyc/customerkyc.component';
import { CreditcheckComponent } from '../loan/creditcheck/creditcheck.component';
const routes: Routes = [
  {
    path: '',component: CustomerdetailsComponent, data: [{ category: 'corporate' }], canActivate: [AuthGuard],
    children: [
      { path: '', component: CustomerProfileComponent, pathMatch:'full' },
      { path: 'attachments', component: CustomerAttachmentsComponent },
      // { path: 'messages', component: CustomerMessagesComponent },
      { path: 'financials', component: CustomerFinanceComponent },
      { path: 'creditcheck', component: CreditcheckComponent },
      { path: 'kyc', component: CustomerkycComponent },
      { path: 'loans', component: CustomerLoansComponent },
      { path: 'investments', component: CustomerInvestmentsComponent },
      { path: 'settings', component: CustomerAccountSettingsComponent },
      { path: 'tracker', component: CustomerTrackerComponent },
      { path: 'verifications', component: CustomerverificationsComponent },
      { path: 'guarantors', component: CustomerguarantorsComponent },
      { path: 'social', component: CustomerSocialComponent },
      { path: 'bank', component: CustomerBankComponent },
      { path: 'schedule', component: CustomerScheduleComponent },
      { path: 'wallet', component: CustomerWalletComponent },
      { path: 'photos', component: CustomerPhotosComponent },
      { path: 'referrals', component: ReferralsComponent},
      { path: 'people', component: CorporatePeopleComponent},
      { path: 'interest', component: InterestComponent},
      { path: 'users', component: UsersComponent}
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersroutingModule { }
