import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_guards/auth.guard';
import { HomeComponent } from '../../setting-module/home/home.component';
import { AccountingComponent } from '../../setting-module/accounting/accounting.component';
import { AnalyticsComponent } from '../../setting-module/analytics/analytics.component';
import { ApprovalsComponent } from '../../setting-module/approvals/approvals.component';
import { CompanyComponent } from '../../setting-module/company/company.component';
import { DashboardComponent } from '../../setting-module/dashboard/dashboard.component';
import { EligibilityQualificationComponent } from '../../setting-module/eligibility-qualification/eligibility-qualification.component';
import { GeneralComponent } from '../../setting-module/general/general.component';
import { MessagesComponent } from '../../setting-module/messages/messages.component';
import { MobileWebsiteComponent } from '../../setting-module/mobile-website/mobile-website.component';
import { PaymentSettingsComponent } from '../../setting-module/payment-settings/payment-settings.component';
import { PeerCrowdComponent } from '../../setting-module/peer-crowd/peer-crowd.component';
import { ProductsComponent } from '../../products/products/products.component';
import { SecurityComponent } from '../../setting-module/security/security.component';
import { UssdChatComponent } from '../../setting-module/ussd-chat/ussd-chat.component';
import { ProductSettingComponent } from '../../setting-module/product-setting/product-setting.component';
import { InterestratefloorComponent } from '../../setting-module/interestratefloor/interestratefloor.component';
import { LoanamountComponent } from '../../setting-module/loanamount/loanamount.component';
import { P2pComponent } from '../../setting-module/p2p/p2p.component';
import { GuarantorComponent } from '../../setting-module/guarantor/guarantor.component';
import { EmailTemplateComponent } from '../../setting-module/email-template/email-template.component';

import { ProductModule } from '../../product/product.module';
import { ProductbasicComponent } from '../../product/productbasic/productbasic.component';
import { ProductsettingsComponent } from '../../product/productsettings/productsettings.component';
import { ProductapprovalsComponent } from '../../product/productapprovals/productapprovals.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],

    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'interest', component: InterestratefloorComponent, canActivate: [AuthGuard]},
      { path: 'guarantor', component: GuarantorComponent, canActivate: [AuthGuard]},
      { path: 'p2p', component: P2pComponent, canActivate: [AuthGuard]},
      { path: 'amount', component: LoanamountComponent, canActivate: [AuthGuard]},
      { path: 'accounting', component: AccountingComponent, canActivate: [AuthGuard]},
      { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard]},
      { path: 'approval', component: ApprovalsComponent, canActivate: [AuthGuard]},
      { path: 'company', component: CompanyComponent, canActivate: [AuthGuard]},
      { path: 'ussd', component: UssdChatComponent, canActivate: [AuthGuard]},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      { path: 'eligibility', component: EligibilityQualificationComponent, canActivate: [AuthGuard]},
      { path: 'general', component: GeneralComponent, canActivate: [AuthGuard]},
      { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
      { path: 'mobilewebsite', component: MobileWebsiteComponent, canActivate: [AuthGuard]},
      { path: 'payment', component: PaymentSettingsComponent, canActivate: [AuthGuard]},
      { path: 'peer-crowd', component: PeerCrowdComponent, canActivate: [AuthGuard]},
      { path: 'products', component: ProductSettingComponent, canActivate: [AuthGuard]},
      { path: 'security', component: SecurityComponent, canActivate: [AuthGuard]},
      { path: 'email', component: EmailTemplateComponent, canActivate: [AuthGuard]},
      { path: 'product/:id', component: ProductbasicComponent, canActivate: [AuthGuard]},
      { path: 'product/:id/details', component: ProductbasicComponent, canActivate: [AuthGuard]},
      { path: 'product/:id/settings', component: ProductsettingsComponent, canActivate: [AuthGuard]},
      { path: 'product/:id/approvals', component: ProductapprovalsComponent, canActivate: [AuthGuard]},
    ]
  },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
 })


export class SettingsroutingModule {}
