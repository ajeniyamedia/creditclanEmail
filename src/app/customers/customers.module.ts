import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CustomerdetailsComponent } from '../customerdetails/customerdetails.component';
import { CustomerProfileComponent } from '../customers/customer-profile/customer-profile.component';
import { CustomerAttachmentsComponent } from '../customers/customer-attachments/customer-attachments.component';
// import { CustomerMessagesComponent } from '../customers/customer-messages/customer-messages.component';
// import { CustomerFinanceComponent } from '../customers/customer-finance/customer-finance.component';
import { CustomerverificationsComponent } from '../customers/customerverifications/customerverifications.component';
import { CustomerguarantorsComponent } from '../customers/customerguarantors/customerguarantors.component';
// import { CustomerLoansComponent } from '../customers/customer-loans/customer-loans.component';
// import { CustomerInvestmentsComponent } from '../customers/customer-investments/customer-investments.component';
import { CustomerAccountSettingsComponent } from '../customers/customer-account-settings/customer-account-settings.component';
import { CustomerTrackerComponent } from '../customers/customer-tracker/customer-tracker.component'; 
import { CustomerSocialComponent } from '../customers/customer-social/customer-social.component';
import { CustomerBankComponent } from '../customers/customer-bank/customer-bank.component';
import { CustomerScheduleComponent } from '../customers/customer-schedule/customer-schedule.component';
import { CustomerWalletComponent } from '../customers/customer-wallet/customer-wallet.component';
import { CustomerPhotosComponent } from '../customers/customer-photos/customer-photos.component'

import { CustomersroutingModule } from './customersrouting.module';
import { ReferralsComponent } from './referrals/referrals.component';
import { CorporatePeopleComponent } from './corporate-people/corporate-people.component';
import { CustomerListComponent } from '../customers/customer-list/customer-list.component';
import { InterestComponent } from './interest/interest.component'; 
import { ReferralStatementComponent } from './referral-statement/referral-statement.component';
import { PrevcustomerComponent } from './prevcustomer/prevcustomer.component';
import { NextcustomerComponent } from './nextcustomer/nextcustomer.component';
import { UsersComponent } from './users/users.component';
import { CustomerPhotoComponent } from './customer-photo/customer-photo.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomersroutingModule
  ],
  declarations: [
    CustomerdetailsComponent,
    ReferralStatementComponent,
    CustomerProfileComponent,
    CustomerAttachmentsComponent,
    CustomerPhotoComponent,
    // CustomerMessagesComponent,
    // CustomerFinanceComponent,
    CustomerverificationsComponent,
    CustomerverificationsComponent,
    CustomerguarantorsComponent,
    // CustomerLoansComponent,
    // CustomerInvestmentsComponent,
    CustomerAccountSettingsComponent,
    CustomerTrackerComponent,
    CustomerSocialComponent,
    CustomerBankComponent,
    CustomerScheduleComponent,
    CustomerWalletComponent,
    CustomerPhotosComponent,
    ReferralsComponent,
    CorporatePeopleComponent,
    CustomerListComponent,
    InterestComponent,
    PrevcustomerComponent,
    NextcustomerComponent,
    UsersComponent
  ]
})
export class CustomersModule { }
