import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
import { SafehtmlPipe } from '../_pipes/safehtml.pipe';
import { LoanStatusPipe } from '../_pipes/loan-status.pipe';
import { OfferstatusPipe } from '../_pipes/offerstatus.pipe';
import { PeertopeerPipe } from '../_pipes/peertopeer.pipe';
import { SafePipe } from '../_pipes/safe.pipe';
import { MyDatePickerModule } from 'mydatepicker';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
// import { TagInputModule } from 'ngx-chips';
import { OrderModule } from 'ngx-order-pipe';

import { ProductsComponent } from '../products/products/products.component'

import { MobileComponent } from '../mobile/mobile/mobile.component';
import { FilterpipePipe } from '../_pipes/filterpipe.pipe';
import { ImagenotfoundPipe } from '../_pipes/imagenotfound.pipe';
import { JournalapprovedPipe } from '../_pipes/journalapproved.pipe';
import { LimittoPipe } from '../_pipes/limitto.pipe';
import { MoneyPipe } from '../_pipes/money.pipe';
import { MainNavigationComponent } from '../main-navigation/main-navigation.component';
import { UiSwitchModule } from '../../../node_modules/ngx-ui-switch';
import { AgefilterPipe } from '../_pipes/agefilter.pipe';
import { MycurrencyPipe } from '../_pipes/mycurrency.pipe';
import { NgxEditorModule } from 'ngx-editor';
import { PercentageFundedPipe } from '../_pipes/percentage-funded.pipe';
import { SelectModule } from 'ng2-select';
import { BackendsettingsComponent } from '../backend/backendsettings/backendsettings.component';
import { LevelformComponent } from '../backend/levelform/levelform.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { NewlevelformComponent } from '../backend/newlevelform/newlevelform.component';
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
import { TimelineComponent } from './timeline/timeline.component';
import { ChangepaymentComponent } from './changepayment/changepayment.component';
import { ChangeloanofficerComponent } from './changeloanofficer/changeloanofficer.component';
import { CreditingstatementComponent } from './creditingstatement/creditingstatement.component';
import { SmslogsComponent } from './smslogs/smslogs.component';
import { MakeloanpaymentComponent } from './makeloanpayment/makeloanpayment.component';
import { CardcollectionComponent } from './cardcollection/cardcollection.component';
import { ClearingfinesComponent } from './clearingfines/clearingfines.component';
import { CustomerwithdrawalComponent } from './customerwithdrawal/customerwithdrawal.component';
import { StopremitaComponent } from './stopremita/stopremita.component';
import { NotifyremitaComponent } from './notifyremita/notifyremita.component';
import { RefreshremitaComponent } from './refreshremita/refreshremita.component';
import { BuybackloanComponent } from './buybackloan/buybackloan.component';
import { PostsavingsComponent } from './postsavings/postsavings.component';
import { BreakinvestmentComponent } from './breakinvestment/breakinvestment.component';
import { InvestmentwithdrawalComponent } from './investmentwithdrawal/investmentwithdrawal.component';
import { GeneralformComponent } from '../operations/generalform/generalform.component';
import { InterestformComponent } from '../operations/interestform/interestform.component';
import { OriginationfeeComponent } from '../operations/originationfee/originationfee.component';

import { WelcomeEmailComponent } from '../email-template/welcome-email/welcome-email.component';
import { OfferLetterComponent } from '../email-template/offer-letter/offer-letter.component';
import { PhoneOtpComponent } from '../email-template/phone-otp/phone-otp.component';
import { RestPinComponent } from '../email-template/rest-pin/rest-pin.component';
import { DirectDebitEmailComponent } from '../email-template/direct-debit-email/direct-debit-email.component';
import { ValidationWorkEmailComponent } from '../email-template/validation-work-email/validation-work-email.component';
import { LoanRejectionEmailComponent } from '../email-template/loan-rejection-email/loan-rejection-email.component';
import { PaymentReceivedComponent } from '../email-template/payment-received/payment-received.component';
import { BorrowerReceivedOfferEmailComponent } from '../email-template/borrower-received-offer-email/borrower-received-offer-email.component';
import { LenderMakeOfferComponent } from '../email-template/lender-make-offer/lender-make-offer.component';
import { BorrowerAccpectedOfferLetterComponent } from '../email-template/borrower-accpected-offer-letter/borrower-accpected-offer-letter.component';
import { WithdrawalEmailComponent } from '../email-template/withdrawal-email/withdrawal-email.component';
import { SentToMarketComponent } from '../email-template/sent-to-market/sent-to-market.component';
import { GuarantorRequestEmailComponent } from '../email-template/guarantor-request-email/guarantor-request-email.component';
import { CardRequestEmailComponent } from '../email-template/card-request-email/card-request-email.component';
import { BankAccountConfirmationEmailComponent } from '../email-template/bank-account-confirmation-email/bank-account-confirmation-email.component';
import { RequestForAttachmentsComponent } from '../email-template/request-for-attachments/request-for-attachments.component';
import { BvnVerificationEmailComponent } from '../email-template/bvn-verification-email/bvn-verification-email.component';
import { RepaymentReminderEmailComponent } from '../email-template/repayment-reminder-email/repayment-reminder-email.component';
import { LoanDisbursedEmailComponent } from '../email-template/loan-disbursed-email/loan-disbursed-email.component';


import { EmpsearchComponent } from '../operations/empsearch/empsearch.component';
import { EmailSettingComponent } from '../../app/email-setting/email-setting.component';

import { ProductbasicComponent } from '../product/productbasic/productbasic.component';
import { ProductsettingsComponent } from '../product/productsettings/productsettings.component';
import { ProductapprovalsComponent } from '../product/productapprovals/productapprovals.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MyDatePickerModule,
    IonRangeSliderModule, MomentModule, UiSwitchModule, NgxEditorModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    QuillModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDo9iJ7vED5HmaBJQcqrpqcQlxEo2jlRqA'
    }),
    OrderModule, NguiDatetimePickerModule, InfiniteScrollModule
  ],
  entryComponents: [ChangepaymentComponent],
  declarations: [
    LimittoPipe, SafePipe, LoanStatusPipe, OfferstatusPipe, PeertopeerPipe, SafehtmlPipe,
    DateinvalidPipe, PercentageFundedPipe, AgefilterPipe, MycurrencyPipe,
    FilterpipePipe, ImagenotfoundPipe, ProductsComponent, ProductsettingsComponent,
    JournalapprovedPipe, MoneyPipe, MainNavigationComponent, ProductapprovalsComponent,
    CalendarComponent, UnauthorizedComponent, BackendsettingsComponent, LevelformComponent, MobileComponent,
    DirectdebitinitiateComponent, DirectdebitstatusComponent, DirectdebitcancelComponent,
    StopmandateComponent, CreditcheckdetailsComponent, ContractofferComponent,
    AllcustomersComponent, BankslistComponent, CompaniesComponent, ProductbasicComponent,
    ProductsettingsComponent, ProductapprovalsComponent,
    NotificationsComponent, TimelineComponent, ChangepaymentComponent, ChangeloanofficerComponent,
    CreditingstatementComponent, SmslogsComponent, MakeloanpaymentComponent, CardcollectionComponent, ClearingfinesComponent,
    CustomerwithdrawalComponent,NewlevelformComponent,
    StopremitaComponent,GeneralformComponent,InterestformComponent,OriginationfeeComponent,
    NotifyremitaComponent,EmpsearchComponent, EmailSettingComponent,
    RefreshremitaComponent, WelcomeEmailComponent, OfferLetterComponent, PhoneOtpComponent, RestPinComponent, 
    DirectDebitEmailComponent, ValidationWorkEmailComponent,
    LoanRejectionEmailComponent, PaymentReceivedComponent, LenderMakeOfferComponent,
    BorrowerAccpectedOfferLetterComponent, BorrowerReceivedOfferEmailComponent,
    WithdrawalEmailComponent, SentToMarketComponent, GuarantorRequestEmailComponent,
    CardRequestEmailComponent, BankAccountConfirmationEmailComponent,
    RequestForAttachmentsComponent, BvnVerificationEmailComponent,
    RepaymentReminderEmailComponent, LoanDisbursedEmailComponent
  ],
  exports: [
    LimittoPipe, SafePipe, LoanStatusPipe, OfferstatusPipe, PeertopeerPipe, SafehtmlPipe,
    FilterpipePipe, ImagenotfoundPipe, DateinvalidPipe,
    JournalapprovedPipe, RouterModule, IonRangeSliderModule,
    MoneyPipe, FormsModule, MyDatePickerModule, ProductbasicComponent,
    MomentModule, ReactiveFormsModule, NgxEditorModule,
    UiSwitchModule, MainNavigationComponent, ProductsComponent,
    CalendarComponent, UnauthorizedComponent, BackendsettingsComponent, LevelformComponent, MobileComponent,
    DirectdebitinitiateComponent, DirectdebitstatusComponent, DirectdebitcancelComponent,
    StopmandateComponent, CreditcheckdetailsComponent, ContractofferComponent,
    AllcustomersComponent, BankslistComponent, CompaniesComponent,
    NotificationsComponent, TimelineComponent, ChangepaymentComponent, ChangeloanofficerComponent,
    CreditingstatementComponent, SmslogsComponent, MakeloanpaymentComponent, CardcollectionComponent, ClearingfinesComponent,
    CustomerwithdrawalComponent,
    StopremitaComponent,NewlevelformComponent,
    NotifyremitaComponent,EmpsearchComponent,
    RefreshremitaComponent,GeneralformComponent,InterestformComponent,
    OriginationfeeComponent, EmailSettingComponent, WelcomeEmailComponent,
    OfferLetterComponent, PhoneOtpComponent, RestPinComponent, 
     DirectDebitEmailComponent, ValidationWorkEmailComponent,
    LoanRejectionEmailComponent, PaymentReceivedComponent, 
    LenderMakeOfferComponent, BorrowerAccpectedOfferLetterComponent,
    WithdrawalEmailComponent, SentToMarketComponent, GuarantorRequestEmailComponent, 
    CardRequestEmailComponent, BankAccountConfirmationEmailComponent, 
    RequestForAttachmentsComponent, BvnVerificationEmailComponent,
    BorrowerReceivedOfferEmailComponent,
    RepaymentReminderEmailComponent, LoanDisbursedEmailComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AgmCoreModule, FroalaEditorModule, FroalaViewModule, QuillModule]
    };
  }
}
