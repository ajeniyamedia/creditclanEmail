import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Headers, Http, Response } from '@angular/http';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedinGuard } from './_guards/loggedin.guard'; 
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'; 
import { CreditComponent } from './credit/credit.component';
import { CreditdashboardComponent } from './creditdashboard/creditdashboard.component';
import { LoansComponent } from './loans/loans.component'; 
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component'; 
import { LoanscheduleComponent } from './loanschedule/loanschedule.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvestmentdetailsComponent } from './investmentdetails/investmentdetails.component';
import { InvestmentscheduleComponent } from './investmentschedule/investmentschedule.component';
import { InvestmentborrowerComponent } from './investmentborrower/investmentborrower.component';
import { AccountreportsComponent } from './accountreports/accountreports.component'; 
import { AccoutreportsComponent } from './accoutreports/accoutreports.component'; 
import { PortfolioComponent } from './portfolio/portfolio.component';
// import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ApprovalsService,DataService, AuthenticationService, UserService, StorageService } from './_services/index';
import { CustomerService, InvestmentService, LoansService, OptionsserviceService, OperationsService, KycService,MarketService,AnalyticsService } from './_services/index';
import { CustomersService } from './_services/customers.service';
import { HttpHelperService } from './_services/http-helper.service';
import { GmapsserviceService } from './_services/gmapsservice.service';
import { ChatService } from './_services/chat.service';
import { LoggingService } from './_services/logging.service';
import { HelperService } from './_services/helper.service';
import { ConstantsService } from './_services/constants.service';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { DuerepaymentComponent } from './duerepayment/duerepayment.component';
import { PendingDisbursementComponent } from './pending-disbursement/pending-disbursement.component';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { CreditsummaryComponent } from './creditsummary/creditsummary.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DisbursenavComponent } from './disbursenav/disbursenav.component';
import { LoadingComponent } from './loading/loading.component';
import { ImageComponent } from '../app/image/image.component';
import { PageNotFoundComponentComponent } from '../app/page-not-found-component/page-not-found-component.component';
import { RepaymentComponent } from '../app/repayment/repayment.component';
import { RepaymentsComponent } from './repayments/repayments.component'; 
import { MyapprovalsComponent } from './myapprovals/myapprovals.component';
import { StatementprofileComponent } from './statementprofile/statementprofile.component'; 

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ForgotComponent } from './forgot/forgot.component'; 
@NgModule({
  declarations: [
    CarouselComponent,CreditsummaryComponent,DisbursenavComponent,RepaymentsComponent,
    AppComponent,ImageComponent,LoadingComponent,PageNotFoundComponent,
    LoginComponent,PageNotFoundComponentComponent,
    SignupComponent,
    CreditComponent,
    CreditdashboardComponent,
    LoansComponent, 
    CustomerCreateComponent,
    RepaymentComponent, 
    LoanscheduleComponent,
    PageNotFoundComponent, 
    AccountreportsComponent, 
    AccoutreportsComponent,
    PortfolioComponent,
    //UnauthorizedComponent,
    DuerepaymentComponent,
    LoansComponent,
    PendingDisbursementComponent,
    StatementprofileComponent,
    MyapprovalsComponent,
    ForgotComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    ToastrModule.forRoot(),
    HttpModule,
    ChartsModule, 
    IonRangeSliderModule,
    SlimLoadingBarModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    LoggedinGuard,
    AuthenticationService,
    GmapsserviceService,
    DataService,
    UserService,
    StorageService,
    CustomerService,
    InvestmentService,
    LoansService,
    OptionsserviceService, 
    OperationsService,
    HttpHelperService,
    HelperService,
    ConstantsService,
    CustomersService,
    ChatService,
    LoggingService, 
    KycService,
    MarketService,
    ApprovalsService,
    AnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
