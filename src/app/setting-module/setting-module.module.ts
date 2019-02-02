import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GeneralComponent } from './general/general.component';
import { MobileWebsiteComponent } from './mobile-website/mobile-website.component';
import { UssdChatComponent } from './ussd-chat/ussd-chat.component';
import { EligibilityQualificationComponent } from './eligibility-qualification/eligibility-qualification.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { CompanyComponent } from './company/company.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MessagesComponent } from './messages/messages.component';
import { PaymentSettingsComponent } from './payment-settings/payment-settings.component';
import { SecurityComponent } from './security/security.component';
import { AccountingComponent } from './accounting/accounting.component';
import { PeerCrowdComponent } from './peer-crowd/peer-crowd.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsroutingModule } from './settingsrouting/settingsrouting.module';
import { SharedModule } from '../shared/shared.module';
import { ProductSettingComponent } from './product-setting/product-setting.component';
import { InterestratefloorComponent } from './interestratefloor/interestratefloor.component';
import { LoanamountComponent } from './loanamount/loanamount.component';
import { P2pComponent } from './p2p/p2p.component';
import { GuarantorComponent } from './guarantor/guarantor.component';
import { EmailTemplateComponent } from './email-template/email-template.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsroutingModule,
    SharedModule
  ],
  declarations: [HomeComponent, GeneralComponent, MobileWebsiteComponent,
    UssdChatComponent, EligibilityQualificationComponent, InterestratefloorComponent,
    ApprovalsComponent, CompanyComponent, AnalyticsComponent, MessagesComponent,
    LoanamountComponent,
    PaymentSettingsComponent, SecurityComponent, AccountingComponent, PeerCrowdComponent,
    DashboardComponent, ProductSettingComponent, P2pComponent, GuarantorComponent, EmailTemplateComponent]
})
export class SettingModuleModule { }
