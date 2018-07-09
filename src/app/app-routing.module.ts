import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { LoginComponent } from '../app/login/login.component';
import { SignupComponent } from '../app/signup/signup.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { CreditComponent } from '../app/credit/credit.component';
import { CreditdashboardComponent } from '../app/creditdashboard/creditdashboard.component';
import { LoansComponent } from '../app/loans/loans.component';
import { CustomerUpdateComponent } from '../app/customers/customer-update/customer-update.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { RepaymentComponent } from '../app/repayment/repayment.component';
import { ScheduleComponent } from '../app/schedule/schedule.component';
import { RequestsComponent } from '../app/requests/requests.component';
import { LoanscheduleComponent } from '../app/loanschedule/loanschedule.component';
import { PageNotFoundComponent } from '../app/page-not-found/page-not-found.component';
import { InvestmentdetailsComponent } from '../app/investmentdetails/investmentdetails.component';
import { InvestmentscheduleComponent } from './investmentschedule/investmentschedule.component';
import { InvestmentborrowerComponent } from './investmentborrower/investmentborrower.component';
import { InvestmentComponent } from './investment/investment.component';
import { AccoutreportsComponent } from '../app/accoutreports/accoutreports.component';
import { CustomerPhotosComponent } from './customers/customer-photos/customer-photos.component';
import { StatementscheduleComponent } from './statementschedule/statementschedule.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedinGuard } from './_guards/loggedin.guard';
const routes: Routes = [
  {
    path: 'loan/:id',
    loadChildren: '../app/loan/loan.module#LoanModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: CreditdashboardComponent,
  canActivate: [AuthGuard] },
  {
    path: 'password',
    loadChildren: '../app/change-password/change-password.module#ChangePasswordModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  { path: 'portfolio', component: PortfolioComponent,
  canActivate: [AuthGuard] },
  { path: 'porfolio', component: PortfolioComponent,
  canActivate: [AuthGuard] }, 

  {
    path: 'credit', component: CreditComponent,
    children: [
      { path: '', redirectTo: 'creditdashboard', pathMatch: 'full' },
      { path: 'requests', component: LoansComponent },
      { path: 'creditdashboard', component: CreditdashboardComponent },
      { path: 'schedule/:id', component: ScheduleComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'credit/schedule/:id', component: ScheduleComponent,
  canActivate: [AuthGuard]},
  { path: 'customer/create/:type', component: CustomerCreateComponent,
  canActivate: [AuthGuard]},
  { path: 'customer/update/:type/:id', component: CustomerUpdateComponent,
  canActivate: [AuthGuard]},
  {
    path: 'reports',
    loadChildren: '../app/reports/reports.module#ReportsModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'crm',
    loadChildren: '../app/crm/crm.module#CrmModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: '../app/chat/chat.module#ChatModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'setup',
    loadChildren: '../app/onboarding/onboarding.module#OnboardingModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'investments',
    loadChildren: '../app/investments/investments.module#InvestmentsModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'statement/:id',
    loadChildren: '../app/statement/statement.module#StatementModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:type/:id',
    loadChildren: '../app/customers/customers.module#CustomersModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'investment/:id',
    loadChildren: '../app/investment/investment.module#InvestmentModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'operations',
    loadChildren: '../app/operations/operations.module#OperationsModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'requests',
    loadChildren: '../app/requests/requests.module#RequestsModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: '../app/settings/settings.module#SettingsModule',
    data: {
      preload : true
    }
  },
  {
    path: 'settings/mobile',
    loadChildren: '../app/mobile/mobile.module#MobileModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/decision-engine',
    loadChildren: '../app/decision/decision.module#DecisionModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/investors',
    loadChildren: '../app/investors/investors.module#InvestorsModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/ussd',
    loadChildren: '../app/mobile/mobile.module#MobileModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/backend',
    loadChildren: '../app/backend/backend.module#BackendModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'kyc',
    loadChildren: '../app/kyc/kyc.module#KycModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'investments',
    loadChildren: '../app/investments/investments.module#InvestmentsModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: '../app/messages/messages.module#MessagesModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'pickup',
    loadChildren: '../app/pickup/pickup.module#PickupModule',
    data: {
      preload : true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'unauthorized', component: UnauthorizedComponent
  },
  {
    path: 'account_reports', component: AccoutreportsComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'credit/creditdashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
