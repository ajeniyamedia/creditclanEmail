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
import { CreditComponent } from './credit/credit.component';
import { CreditdashboardComponent } from './creditdashboard/creditdashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ApprovalsService,DataService, AuthenticationService, UserService, StorageService } from './_services/index';
import { CustomerService, InvestmentService, LoansService, OptionsserviceService,
   OperationsService, KycService,MarketService,AnalyticsService } from './_services/index';
import { CustomersService } from './_services/customers.service';
import { HttpHelperService } from './_services/http-helper.service';
import { GmapsserviceService } from './_services/gmapsservice.service';
import { ChatService } from './_services/chat.service';
import { LoggingService } from './_services/logging.service';
import { HelperService } from './_services/helper.service';
import { ConstantsService } from './_services/constants.service';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { PageNotFoundComponentComponent } from '../app/page-not-found-component/page-not-found-component.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ForgotComponent } from './forgot/forgot.component';
import { Ng2TrackScrollModule } from 'ng2-track-scroll';
import { NewsettingsComponent } from './newsettings/newsettings.component';
import { EmailHomeComponent } from './email-app/email-home/email-home.component';
import { QuillModule } from 'ngx-quill';
import { WebsiteSettingsComponent } from './email-template/website-settings/website-settings.component';

@NgModule({
  declarations: [
    AppComponent,PageNotFoundComponent,
    LoginComponent,PageNotFoundComponentComponent,
    CreditComponent,
    CreditdashboardComponent,
    PageNotFoundComponent, 
    ForgotComponent, NewsettingsComponent, EmailHomeComponent, WebsiteSettingsComponent
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
    SlimLoadingBarModule.forRoot(),
    Ng2TrackScrollModule.forRoot(),
    QuillModule
  ],
  providers: [
    {provide: String, useValue: "dummy"},
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
