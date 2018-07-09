import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService, StorageService } from '../../_services/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobilesettings.component.html',
  styleUrls: ['./mobilesettings.component.css']
})
export class MobileComponent implements OnInit {
  public product = {
    LOAN_TYPE: '0',
    LOAN_CURRENCY: '0',
    LOAN_DURATION_TYPE: '2',
    LOAN_INTEREST_TYPE: '2',
    LOAN_PRODUCT_ID: '0',
    REPAYMENT_TYPE_ID: '3',
    LOAN_SUBTYPE_ID: '',
    LOAN_AMOUNT: '0',
    MAX_AMOUNT: '0',
    LOAN_DURATION: '0',
    MAX_LOAN_DURATION: '0',
    LOAN_INTERVAL: '0',
    DURATION_INTERVAL: '0',
    DAYS_PER_YEAR: '0',
    LOAN_TITLE: '0',
    LOAN_DESCRIPTION: '0',
    INTEREST_RATE_TYPE_ID: '0',
    LOAN_INTEREST: '0',
    INSTALLMENT_FREQUENCY: '0',
    RP_SET_TYPE: '0',
    PREFERRED_OCCUPATION_SECTOR: [],
    PREFERRED_BORROWER_OCCUPATION: [],
    BASE_DURATION_TYPE: '',
    MIN_LOAN_DURATION_DAYS: '',
    MAX_LOAN_DURATION_DAYS: '',
    ENABLE_LOAN_INTEREST_ON_AMOUNT: false,
    LOAN_INTEREST_AMOUNT: '0',
    LOAN_INTEREST_ON_AMOUNT: '0',
    LOAN_INTEREST_ON_AMOUNT_TYPE: '1',
    ENABLE_FLOOR_INTEREST_RATE: false,
    MAX_FLOOR_DURATION: '1',
    FLOOR_INTEREST_RATE: '0',
    MUST_ACCEPT_CONTRACT: false,
    INCREMENT_AFTER_FLOOR: false,
    FLOOR_INCREMENTAL_VALUE: 0,

  }
  public floor_rate = {
    ENABLE_FLOOR_INTEREST_RATE: false,
    FLOOR_INTEREST_RATE: '0',
    INCREMENT_AFTER_FLOOR: false,
    FLOOR_INCREMENTAL_VALUE: 0,
    MAX_FLOOR_DURATION: '1',
  }
  public fee_settings = {
    FEE_TYPE: '0',
    FEE_PERCENT_VALUE: '0',
    FEE_FLAT_VALUE: '0',
    FEES_ACCOUNT: '0',
    CARD_REQUEST_FEE: '0'
  }
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": '1', "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": '2', "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": '3', "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": '4', "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
    ;
  public interest_duration = 'Per Month';
  public special_interest_duration = 'Per Day';
  companyaccounts = [];
  public loan_currency = "NGN";
  public loan_duration = 'Months';
  public max_loan_duration = 'Months';
  countries: any;

  @Input('is_mobile') is_mobile = false;
  public vr = {
    bvnmustmatch: false,
    cardmustmatch: false,
    accountmustmatch: false,
  }

  @Input('view') view = 'mobile';
  public ussd = {
    gender: false,
    dateofbirth: false,
    occupation: false,
    homeaddress: false,
    workaddress: false,
    occupationsector: false,
    companyofworkname: false,
    monthlyearning: false,
    educationalqualification: false,
    institutionattended: false,
    fixedorvariable: false,
    base_duration: '2',
    base_duration_value: '10',
    default_starting_amount: '0',
    ussd_division_ration: '3'
  };
  public mobile = {
    mustnotifyaccountofficer: '1',
    notificationemail: '',
    customerconfirmsemailafterregisteration: false,
    shouldthecustomerporvidebvnaftersigningup: false,
    shouldthebvnbevalidatedrealtime: false,
    checkifuserhasvalidatedbvn: false,
    checkifuserhasvalidatedemail: false,
    mustprovideselfie: false,
    mustprovideloanpurpose: false,
    addreferralcode: false,
    nextofkin: false,
    education: false,
    social: false,
    homeaddress: false,
    proofofaddress: false,
    workinfo: false,
    personalexpense: false,
    financialrecords: false,
    nooffinancial: '0',
    accountcard: '0',
    guarantor: false,
    guarantorcount: '0',
    documentrefresh: '0',
    loan_product_id: '0',
    GPS_RETRY: '3',
    ENABLE_GEOTAGGING: false,
    SEND_NEW_CUSTOMER_REGISTERED: false,
    SEND_NEW_CUSTOMER_REGISTERED_EMAIL: ''
  }
  public tc = {
    LOAN_PRODUCT_ID: '',
    TERMS_AND_CONDITIONS: '',
    INCLUDE_TERMS_IN_CONTRACT: ''
  }
  public accountcards = [
    { value: '0', display: 'None' },
    { value: '1', display: 'Card' },
    { value: '2', display: 'Bank Account' },
    { value: '3', display: 'Both' }
  ];
  public notify = [
    { value: '0', display: 'Do Nothing' },
    { value: '1', display: 'Notify account officer' },
    { value: '2', display: 'Send to email' },
  ];

  public currentUser: any;
  loading = false;
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '5rem',
    minHeight: '7rem',
    placeholder: 'Enter your text here',
    translate: 'no',
    width: "100%",
    minWidth: "100%"
  };
  constructor(public toastr: ToastrService, vcr: ViewContainerRef, private router: Router,
    public storageService: StorageService, public operationsService: OperationsService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  ngOnInit() {
    let currentUrl = this.router.url;
    if (currentUrl == "/settings/ussd") {
      this.view = 'ussd';
    }
    this.operationsService.getAppSettings(this.currentUser.token)
      .subscribe(data => {
        this.ussd.gender = data.ussd.gender;
        this.ussd.dateofbirth = data.ussd.dateofbirth;
        this.ussd.occupation = data.ussd.dateofbirth;
        this.ussd.homeaddress = data.ussd.homeaddress;
        this.ussd.workaddress = data.ussd.workaddress;
        this.ussd.occupationsector = data.ussd.occupationsector;
        this.ussd.companyofworkname = data.ussd.companyofworkname;
        this.ussd.monthlyearning = data.ussd.monthlyearning;
        this.ussd.educationalqualification = data.ussd.educationalqualification;
        this.ussd.institutionattended = data.ussd.institutionattended;
        this.ussd.fixedorvariable = data.ussd.fixedorvariable;
        this.ussd.base_duration = data.ussd.base_duration;
        this.ussd.base_duration_value = data.ussd.base_duration_value;
        this.ussd.default_starting_amount = data.ussd.default_starting_amount;
        this.ussd.ussd_division_ration = data.ussd.ussd_division_ration;

        this.mobile.loan_product_id = data.product.LOAN_PRODUCT_ID

        this.mobile.customerconfirmsemailafterregisteration = data.mobile.customerconfirmsemailafterregisteration;
        this.mobile.shouldthecustomerporvidebvnaftersigningup = data.mobile.shouldthecustomerporvidebvnaftersigningup;
        this.mobile.shouldthebvnbevalidatedrealtime = data.mobile.shouldthebvnbevalidatedrealtime;

        this.mobile.checkifuserhasvalidatedbvn = data.mobile.checkifuserhasvalidatedbvn;
        this.mobile.checkifuserhasvalidatedemail = data.mobile.checkifuserhasvalidatedemail;

        this.mobile.mustprovideselfie = data.mobile.mustprovideselfie;
        this.mobile.nextofkin = data.mobile.nextofkin;
        this.mobile.education = data.mobile.education;
        this.mobile.social = data.mobile.social;
        this.mobile.homeaddress = data.mobile.homeaddress;
        this.mobile.proofofaddress = data.mobile.proofofaddress;
        this.mobile.workinfo = data.mobile.workinfo;
        this.mobile.personalexpense = data.mobile.personalexpense;
        this.mobile.financialrecords = data.mobile.financialrecords;
        this.mobile.nooffinancial = data.mobile.nooffinancial;
        this.mobile.accountcard = this.accountcards[data.mobile.accountcard].value;
        this.mobile.guarantor = data.mobile.guarantor;
        this.mobile.guarantorcount = data.mobile.guarantorcount;
        this.mobile.documentrefresh = data.mobile.documentrefresh;
        this.mobile.mustprovideloanpurpose = data.mobile.mustprovideloanpurpose;
        this.mobile.addreferralcode = data.mobile.addreferralcode;
        this.mobile.mustnotifyaccountofficer = data.mobile.mustnotifyaccountofficer;
        this.mobile.notificationemail = data.mobile.notificationemail;
        this.mobile.ENABLE_GEOTAGGING = data.mobile.ENABLE_GEOTAGGING;
        this.mobile.GPS_RETRY = data.mobile.GPS_RETRY;
        this.mobile.SEND_NEW_CUSTOMER_REGISTERED = data.mobile.SEND_NEW_CUSTOMER_REGISTERED;
        this.mobile.SEND_NEW_CUSTOMER_REGISTERED_EMAIL = data.mobile.SEND_NEW_CUSTOMER_REGISTERED_EMAIL;


        this.tc.LOAN_PRODUCT_ID = data.product.LOAN_PRODUCT_ID;
        this.tc.TERMS_AND_CONDITIONS = data.product.TERMS_AND_CONDITIONS;
        this.tc.INCLUDE_TERMS_IN_CONTRACT = data.product.INCLUDE_TERMS_IN_CONTRACT;

        this.vr.bvnmustmatch = data.vr.bvnmustmatch;
        this.vr.cardmustmatch = false;
        this.vr.accountmustmatch = data.vr.accountmustmatch;


      });
  }
  save(value, valid) {
    this.loading = true;
    this.operationsService.saveUssdSettings_(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  saveTC(value, valid) {
    this.loading = true;
    this.operationsService.saveTCSettings(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  save_(value, valid) {
    this.loading = true;
    this.operationsService.saveUssdSettings(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  saveMobileRegisteration(value, valid) {
    this.loading = true;
    this.operationsService.saveMobileRegisteration(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  saveMobileApplication(value, valid) {
    this.loading = true;
    this.operationsService.saveMobileApplication(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  saveRecordsValidation(value, valid) {
    this.loading = true;
    this.operationsService.saveRecordsValidation(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  saveForm(event) {
    this.saveGeneralSettings(event.value, event.valid);
  }
  saveFRFrom(event){
    this.saveSpecialLoanInterest(event.value, event.valid)
  }
  saveLAFrom(event){
    this.saveSpecialLoanInterest(event.value, event.valid)
  }
  saveOFFrom(event){
    this.saveFee(event.value, event.valid);
  }
  saveSpecialLoanInterest(value, valid) {

    this.loading = true;
    this.operationsService.saveLoanProduct(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveFee(value, valid) {

    this.loading = true;
    this.operationsService.saveFee(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveGeneralSettings(value, valid) {

    this.loading = true;
    this.operationsService.saveLoanProduct(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
}
