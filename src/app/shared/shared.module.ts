import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FormArray,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router'; 
// import {CalendarComponent} from 'angular2-fullcalendar/src/calendar/calendar';
import { CalendarComponent } from 'ap-angular2-fullcalendar/src/calendar/calendar';

import { MomentModule } from 'angular2-moment';
import { DateinvalidPipe } from '../_pipes/dateinvalid.pipe';
import { LoanStatusTextPipe } from '../_pipes/loan-status-text.pipe';
import { LoanStatusPipe } from '../_pipes/loan-status.pipe';
import { OfferstatusPipe } from '../_pipes/offerstatus.pipe';
import { PeertopeerPipe } from '../_pipes/peertopeer.pipe';
import { SafePipe } from '../_pipes/safe.pipe';
import { BorroweridComponent } from '../borrowerid/borrowerid.component';
import { BreakloanComponent } from '../breakloan/breakloan.component';
import { CalendardetailsComponent } from '../calendardetails/calendardetails.component';
import { ChangeproductComponent } from '../changeproduct/changeproduct.component';
import { CustomerFinanceComponent } from '../customers/customer-finance/customer-finance.component';
import { CustomerInvestmentsComponent } from '../customers/customer-investments/customer-investments.component';
import { CustomerLoansComponent } from '../customers/customer-loans/customer-loans.component';
import { CustomerUpdateComponent } from '../customers/customer-update/customer-update.component';
import { CustomersummaryComponent } from '../customersummary/customersummary.component';
import { ApprovalviewComponent } from '../approvalview/approvalview.component';
import { LoancontractComponent } from '../loancontract';
import { LoanpeertopeerComponent } from '../loanpeertopeer/loanpeertopeer.component';
import { LoancontractformComponent } from '../loancontractform/loancontractform.component';
import { LoandocumentComponent } from '../loandocument';
import { LoanlendersComponent } from '../loanlenders';
import { LoanlogsComponent } from '../loanlogs/loanlogs.component';
import { LoanprofileComponent } from '../loanprofile/loanprofile.component';
import { LoansummaryComponent } from '../loansummary/loansummary.component';
import { LoanchatComponent } from '../loanchat/loanchat.component';
import { PaymentrollbackComponent } from '../paymentrollback/paymentrollback.component';
import { MakepaymentComponent } from '../makepayment/makepayment.component';
import { PayscheduleComponent } from '../payschedule/payschedule.component';
import { RepayComponent } from '../repay/repay.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { UserlocationComponent } from '../userlocation/userlocation.component';
import { WalletdetailsComponent } from '../walletdetails/walletdetails.component';
import { MyDatePickerModule } from 'mydatepicker';
import { IonRangeSliderModule } from 'ng2-ion-range-slider'; 
import { NguiDatetimePickerModule } from '@ngui/datetime-picker'; 
// import { TagInputModule } from 'ngx-chips';
import { OrderModule } from 'ngx-order-pipe';

import { FilterpipePipe } from '../_pipes/filterpipe.pipe';
import { ImagenotfoundPipe } from '../_pipes/imagenotfound.pipe';
import { JournalapprovedPipe } from '../_pipes/journalapproved.pipe';
import { LimittoPipe } from '../_pipes/limitto.pipe';
import { MoneyPipe } from '../_pipes/money.pipe';
import { CalendarviewComponent } from '../calendarview/calendarview.component';
import { LedgerComponent } from '../ledger/ledger.component';
import { LoanchargesComponent } from '../loancharges/loancharges.component';
import { LoanfeesComponent } from '../loanfees/loanfees.component';
import { LoanformComponent } from '../loanform/loanform.component';
import { MainNavigationComponent } from '../main-navigation/main-navigation.component';
import { RatingComponent } from '../rating/rating.component';
import { EmpsearchComponent } from '../operations/empsearch/empsearch.component';
import { PaymentComponent } from '../payment/payment.component'; 
import { UiSwitchModule } from '../../../node_modules/ngx-ui-switch'; 
import { NewbankformComponent } from '../newbankform/newbankform.component';
import { LoanchecklistComponent } from '../loanchecklist/loanchecklist.component';
import { LoanmoreComponent } from '../loanmore/loanmore.component';
import { LoanguarantorsComponent } from '../loanguarantors';
import { LoanlocationComponent } from '../loanlocation/loanlocation.component';
import { LoanchequeComponent } from '../loancheque/loancheque.component';
import { LoanphotosComponent } from '../loanphotos/loanphotos.component';
import { LoanacctsComponent } from '../loanaccts/loanaccts.component';
import { LoancollateralComponent } from '../loancollateral/loancollateral.component';
import { LoananalysisComponent } from '../loananalysis/loananalysis.component';
import { ViewguarantorComponent } from '../viewguarantor/viewguarantor.component';
import { LoanapprovalsComponent } from '../loanapprovals';
import { LoanworkflowComponent } from '../loanworkflow/loanworkflow.component';
import { QueuecancelComponent } from '../operations/queuecancel/queuecancel.component';
import { CustomeranalysisComponent } from '../customers/customeranalysis/customeranalysis.component';
import { NewempformComponent } from '../newempform/newempform.component';
import { RequestformComponent } from '../requestform/requestform.component';
import { LoancustomerformComponent } from '../loancustomerform/loancustomerform.component'; 
import { BulkpaymentComponent } from '../operations/bulkpayment/bulkpayment.component';
import { AgefilterPipe } from '../_pipes/agefilter.pipe';
import { MycurrencyPipe } from '../_pipes/mycurrency.pipe';
import { NgxEditorModule } from 'ngx-editor';
import { PercentageFundedPipe } from '../_pipes/percentage-funded.pipe'; 
import { SelectModule } from 'ng2-select';
import {BackendsettingsComponent} from '../backend/backendsettings/backendsettings.component';
import {LevelformComponent} from '../backend/levelform/levelform.component';
import {MobileComponent} from '../mobile/mobile/mobile.component';
import { WebUssdComponent } from '../web-ussd/web-ussd.component';
import { GeneralformComponent } from '../operations/generalform/generalform.component';
import { InterestformComponent } from '../operations/interestform/interestform.component';
import { LoanamountComponent } from '../operations/loanamount/loanamount.component';
import { OriginationfeeComponent } from '../operations/originationfee/originationfee.component';
import { InterestratefloorComponent } from '../operations/interestratefloor/interestratefloor.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { NewlevelformComponent } from '../backend/newlevelform/newlevelform.component';
import { CustomerRemitaComponent } from '../customer-remita/customer-remita.component';

import { KycdetailsComponent } from '../kyc/kycdetails/kycdetails.component';
import { CustomerkycComponent } from '../customerkyc/customerkyc.component';
import { AdjustweightsComponent } from '../loan/adjustweights/adjustweights.component';
import { IncludedcompaniesComponent } from '../decision/includedcompanies/includedcompanies.component';
import { LoanrepaymentComponent } from '../loanrepayment/loanrepayment.component';
import { DirectdebitComponent } from '../loan/directdebit/directdebit.component';
import { CreditcheckComponent } from '../loan/creditcheck/creditcheck.component';
import { DirectdebitinitiateComponent } from './directdebitinitiate/directdebitinitiate.component';
import { DirectdebitstatusComponent } from './directdebitstatus/directdebitstatus.component';
import { DirectdebitcancelComponent } from './directdebitcancel/directdebitcancel.component';
import { StopmandateComponent } from './stopmandate/stopmandate.component';
import { CreditcheckdetailsComponent } from './creditcheckdetails/creditcheckdetails.component';
import { ContractofferComponent } from './contractoffer/contractoffer.component';
import { AllcustomersComponent } from './allcustomers/allcustomers.component';
import { BankslistComponent } from './bankslist/bankslist.component';
import { CompaniesComponent } from './companies/companies.component';
import { NotificationsComponent } from './notifications/notifications.component'; 
@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MyDatePickerModule,
    IonRangeSliderModule, MomentModule, UiSwitchModule,NgxEditorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDo9iJ7vED5HmaBJQcqrpqcQlxEo2jlRqA'
    }),
    OrderModule,NguiDatetimePickerModule
  ],
  declarations: [
    LimittoPipe, SafePipe, LoanStatusPipe, OfferstatusPipe, PeertopeerPipe, 
    DateinvalidPipe,PercentageFundedPipe,AgefilterPipe,MycurrencyPipe,
    FilterpipePipe, ImagenotfoundPipe, PayscheduleComponent,BackendsettingsComponent,LevelformComponent,MobileComponent,
    JournalapprovedPipe, MoneyPipe, MainNavigationComponent, LoanapprovalsComponent,
    LoanformComponent, LoanfeesComponent, LoanchargesComponent, LoanchecklistComponent, WebUssdComponent,
    LoanguarantorsComponent,LoanpeertopeerComponent,NewempformComponent,
    RequestformComponent,LoancustomerformComponent,
    CalendarComponent, UnauthorizedComponent,
    ViewguarantorComponent, LoananalysisComponent, LoanworkflowComponent,
    CalendarviewComponent, CalendardetailsComponent, LoanmoreComponent,
    RatingComponent, BorroweridComponent, BreakloanComponent, LoansummaryComponent, PaymentrollbackComponent,
    MakepaymentComponent, CustomersummaryComponent, ScheduleComponent, RepayComponent, LoanprofileComponent,
    CustomerFinanceComponent, CustomerInvestmentsComponent, 
    CustomerLoansComponent, LoancontractComponent, LoandocumentComponent,
    ChangeproductComponent, LoanlogsComponent, LoancontractformComponent, 
    UserlocationComponent, LoancontractformComponent, LoanlendersComponent,
    LoanStatusTextPipe, WalletdetailsComponent, EmpsearchComponent, LoanlocationComponent, LoanchequeComponent, LoanphotosComponent,
    LoandocumentComponent, LoanacctsComponent, LoancollateralComponent, 
    LoanlogsComponent, PaymentComponent, ApprovalviewComponent, NewbankformComponent,QueuecancelComponent,
    LoanchatComponent,
    CustomeranalysisComponent,BulkpaymentComponent,CustomerUpdateComponent,LedgerComponent, GeneralformComponent,
    InterestformComponent, LoanamountComponent, InterestratefloorComponent, OriginationfeeComponent, NewlevelformComponent,
    CustomerRemitaComponent, KycdetailsComponent, CustomerkycComponent, AdjustweightsComponent,
    IncludedcompaniesComponent,LoanrepaymentComponent,DirectdebitComponent, CreditcheckComponent, 
    DirectdebitinitiateComponent, DirectdebitstatusComponent, DirectdebitcancelComponent, 
    StopmandateComponent, CreditcheckdetailsComponent, ContractofferComponent, AllcustomersComponent, BankslistComponent, CompaniesComponent, 
    NotificationsComponent
  ],
  exports: [
    LimittoPipe, SafePipe, LoanStatusPipe, OfferstatusPipe, LoanStatusTextPipe, PeertopeerPipe,WebUssdComponent,
    FilterpipePipe, ImagenotfoundPipe, PayscheduleComponent, DateinvalidPipe, LoanworkflowComponent,
    JournalapprovedPipe, RouterModule, IonRangeSliderModule,BackendsettingsComponent,LevelformComponent,MobileComponent,
    MoneyPipe, FormsModule, MyDatePickerModule, LoananalysisComponent, LoanapprovalsComponent,
    RequestformComponent,
    MomentModule, ReactiveFormsModule, MainNavigationComponent, ViewguarantorComponent,
    LoanformComponent, LoanfeesComponent, LoanchargesComponent, EmpsearchComponent,LoanchatComponent,
    PaymentComponent,NgxEditorModule,
    UiSwitchModule, LoanguarantorsComponent, LoanlocationComponent, LoanchequeComponent, LoanphotosComponent,
    LoandocumentComponent, LoanacctsComponent, LoancollateralComponent, LoanlogsComponent,NewempformComponent,
    CalendarComponent, UnauthorizedComponent,
    ApprovalviewComponent, NewbankformComponent,NguiDatetimePickerModule,
    CalendarviewComponent, LoanchecklistComponent, LoanmoreComponent,
    CalendardetailsComponent, RatingComponent, BorroweridComponent, NewlevelformComponent, 
    BreakloanComponent, LoansummaryComponent, PaymentrollbackComponent,
    MakepaymentComponent, CustomersummaryComponent, ScheduleComponent, RepayComponent, LoanprofileComponent,
    CustomerFinanceComponent, CustomerInvestmentsComponent, CustomerLoansComponent, 
    LoancontractComponent, LoandocumentComponent, WalletdetailsComponent,
    ChangeproductComponent, LoanlogsComponent, LoancontractComponent, UserlocationComponent, 
    LoancontractformComponent, LoanlendersComponent, OrderModule,
    QueuecancelComponent,LoanpeertopeerComponent,KycdetailsComponent,IncludedcompaniesComponent,
    CustomeranalysisComponent,BulkpaymentComponent,CustomerUpdateComponent,SelectModule,LedgerComponent,GeneralformComponent,
    InterestformComponent, LoanamountComponent, InterestratefloorComponent, OriginationfeeComponent,
    CustomerRemitaComponent,LoanrepaymentComponent,BankslistComponent,
    AdjustweightsComponent, DirectdebitComponent, CreditcheckComponent, 
    DirectdebitinitiateComponent, DirectdebitstatusComponent, DirectdebitcancelComponent, 
    StopmandateComponent,CreditcheckdetailsComponent,ContractofferComponent,AllcustomersComponent, CompaniesComponent,
    NotificationsComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AgmCoreModule]
    }
  }
}
