import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService, StorageService, AuthenticationService } from '../../_services/index';
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
  { "LOAN_INTEREST_DURATION_ID": '4', "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }];
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
  };

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
    validate_work_email:false,
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
    companylist: false,
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
    SEND_NEW_CUSTOMER_REGISTERED_EMAIL: '',
    skipphoneconfirmation:false
  }
  public tc = {
    LOAN_PRODUCT_ID: '',
    TERMS_AND_CONDITIONS: '',
    INCLUDE_TERMS_IN_CONTRACT: ''
  }
  public ol = {
    LOAN_PRODUCT_ID: '',
    OFFER_LETTER: '' 
  }
  public accountcards = [
    { value: '0', display: 'None' },
    { value: '1', display: 'Card' },
    { value: '2', display: 'Bank Account' },
    { value: '3', display: 'Both' }
  ];
  public notify = [
    { value: '0', display: 'Do Nothing' }, 
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
  required_documents:any;
  constructor(public authService:AuthenticationService,public toastr: ToastrService, vcr: ViewContainerRef, private router: Router,
    public storageService: StorageService, public operationsService: OperationsService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    if(!authService.canViewModule('1,3')){
      this.router.navigate(['../unauthorized']);
    }
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
    this.operationsService.getAppSettings(this.currentUser.token,2)
      .subscribe(data => {
        this.required_documents = data.required_documents;
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

        this.mobile.loan_product_id = data.product.LOAN_PRODUCT_ID;
        this.mobile.skipphoneconfirmation = data.mobile.skipphoneconfirmation;

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
        this.mobile.companylist = data.mobile.companylist;
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
        
        this.mobile.validate_work_email = data.mobile.validate_work_email;
        this.mobile.notificationemail = data.mobile.notificationemail;
        this.mobile.ENABLE_GEOTAGGING = data.mobile.ENABLE_GEOTAGGING;
        this.mobile.GPS_RETRY = data.mobile.GPS_RETRY;
        this.mobile.SEND_NEW_CUSTOMER_REGISTERED = data.mobile.SEND_NEW_CUSTOMER_REGISTERED;
        this.mobile.SEND_NEW_CUSTOMER_REGISTERED_EMAIL = data.mobile.SEND_NEW_CUSTOMER_REGISTERED_EMAIL;


        this.tc.LOAN_PRODUCT_ID = data.product.LOAN_PRODUCT_ID;
        this.tc.TERMS_AND_CONDITIONS = data.product.TERMS_AND_CONDITIONS;
        this.tc.INCLUDE_TERMS_IN_CONTRACT = data.product.INCLUDE_TERMS_IN_CONTRACT;

        
        this.ol.OFFER_LETTER = data.product.OFFER_LETTER;

        this.vr.bvnmustmatch = data.vr.bvnmustmatch;
        this.vr.cardmustmatch = false;
        this.vr.accountmustmatch = data.vr.accountmustmatch;


        this.fee_settings.FEE_TYPE = data.fees.FEE_TYPE;
        this.fee_settings.FEE_FLAT_VALUE = data.fees.TOTAL_FLAT_FEES;
        this.fee_settings.FEE_PERCENT_VALUE = data.fees.TOTAL_PERCENTAGE_FEES;
        this.fee_settings.FEES_ACCOUNT = data.fees.FEES_ACCOUNT;
        this.fee_settings.CARD_REQUEST_FEE = data.fees.CARD_REQUEST_FEE;

        this.product.LOAN_DURATION_TYPE = data.product.LOAN_DURATION_TYPE;
        this.product.LOAN_CURRENCY = data.product.LOAN_CURRENCY;
        this.product.LOAN_INTEREST_TYPE = data.product.LOAN_INTEREST_TYPE;
        this.product.LOAN_PRODUCT_ID = data.product.LOAN_PRODUCT_ID;
        this.product.LOAN_TYPE = data.product.LOAN_TYPE;
        this.product.REPAYMENT_TYPE_ID = data.product.REPAYMENT_TYPE_ID;
        this.product.LOAN_SUBTYPE_ID = data.product.LOAN_SUBTYPE_ID;
        this.product.LOAN_AMOUNT = data.product.LOAN_AMOUNT;
        this.product.MAX_AMOUNT = data.product.MAX_AMOUNT;
        this.product.LOAN_DURATION = data.product.LOAN_DURATION;
        this.product.MAX_LOAN_DURATION = data.product.MAX_LOAN_DURATION;
        this.product.LOAN_INTERVAL = data.product.LOAN_INTERVAL;
        this.product.DAYS_PER_YEAR = data.product.DAYS_PER_YEAR;
        this.product.LOAN_TITLE = data.product.LOAN_TITLE;
        this.product.LOAN_DESCRIPTION = data.product.LOAN_DESCRIPTION;
        this.product.INTEREST_RATE_TYPE_ID = data.product.INTEREST_RATE_TYPE_ID;
        this.product.LOAN_INTEREST = data.product.LOAN_INTEREST;
        this.product.INSTALLMENT_FREQUENCY = data.product.INSTALLMENT_FREQUENCY;
        this.product.RP_SET_TYPE = data.product.RP_SET_TYPE;
        this.product.DURATION_INTERVAL = data.product.DURATION_INTERVAL;
        this.product.PREFERRED_BORROWER_OCCUPATION = data.product.PREFERRED_BORROWER_OCCUPATION;
        this.product.PREFERRED_OCCUPATION_SECTOR = data.product.PREFERRED_OCCUPATION_SECTOR;
        this.product.BASE_DURATION_TYPE = data.product.BASE_DURATION_TYPE;
        this.product.MIN_LOAN_DURATION_DAYS = data.product.MIN_LOAN_DURATION_DAYS;
        this.product.MAX_LOAN_DURATION_DAYS = data.product.MAX_LOAN_DURATION_DAYS;
        this.product.ENABLE_LOAN_INTEREST_ON_AMOUNT = data.product.ENABLE_LOAN_INTEREST_ON_AMOUNT;
        this.product.LOAN_INTEREST_ON_AMOUNT = data.product.LOAN_INTEREST_ON_AMOUNT;
        this.product.LOAN_INTEREST_ON_AMOUNT_TYPE = data.product.LOAN_INTEREST_ON_AMOUNT_TYPE;
        this.product.LOAN_INTEREST_AMOUNT = data.product.LOAN_INTEREST_AMOUNT;

        this.product.MUST_ACCEPT_CONTRACT = data.backend.MUST_ACCEPT_CONTRACT;

        this.floor_rate.ENABLE_FLOOR_INTEREST_RATE = data.product.ENABLE_FLOOR_INTEREST_RATE;
        this.floor_rate.MAX_FLOOR_DURATION = data.product.MAX_FLOOR_DURATION;
        this.floor_rate.FLOOR_INTEREST_RATE = data.product.FLOOR_INTEREST_RATE;
        this.floor_rate.INCREMENT_AFTER_FLOOR = data.product.INCREMENT_AFTER_FLOOR;
        this.floor_rate.FLOOR_INCREMENTAL_VALUE = data.product.FLOOR_INCREMENTAL_VALUE;

        this.companyaccounts = data.accounts.a;
        if (data.product.LOAN_INTEREST_TYPE === '1') {

          this.interest_duration = "Per Day";
        }
        if (data.product.LOAN_INTEREST_TYPE == '2') {

          this.interest_duration = "Per Month";
        }
        if (data.product.LOAN_INTEREST_TYPE == '3') {
          this.interest_duration = "Per Year";
        }
        if (data.product.LOAN_INTEREST_TYPE == '4') {
          this.interest_duration = "Per Week";

        }
        if (data.product.LOAN_INTEREST_ON_AMOUNT_TYPE === '1') {

          this.special_interest_duration = "Per Day";
        }
        if (data.product.LOAN_INTEREST_ON_AMOUNT_TYPE == '2') {

          this.special_interest_duration = "Per Month";
        }
        if (data.product.LOAN_INTEREST_ON_AMOUNT_TYPE == '3') {
          this.special_interest_duration = "Per Year";
        }
        if (data.product.LOAN_INTEREST_ON_AMOUNT_TYPE == '4') {
          this.special_interest_duration = "Per Week";

        }
        if (data.product.LOAN_DURATION_TYPE == '1') {
          this.loan_duration = "Days";
        }
        if (data.product.LOAN_DURATION_TYPE == '2') {
          this.loan_duration = "Months";
        }
        if (data.product.LOAN_DURATION_TYPE == '3') {
          this.loan_duration = "Years";
        }
        if (data.product.LOAN_DURATION_TYPE == '4') {
          this.loan_duration = "Weeks";

        }


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
    this.operationsService.saveMobileApplication(this.currentUser.token, value, this.required_documents)
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
  saveITFrom(event) {
    this.saveInterestForm(event.value, event.valid);
  }
  saveFRFrom(event) {
    this.saveFloorRate(event.value, event.valid)
  }
  saveLAFrom(event) {
    this.saveSpecialLoanInterest(event.value, event.valid)
  }
  saveOFFrom(event) {
    this.saveFee(event.value, event.valid);
  }
  saveFloorRate(value, valid) {
    value.WHERE_FROM = '2';
    this.loading = true;
    this.operationsService.saveFloorRate(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveSpecialLoanInterest(value, valid) {
    value.WHERE_FROM = '2';
    this.loading = true;
    this.operationsService.saveSLInterest(this.currentUser.token, value)
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
    value.WHERE_FROM = '2';
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
    value.WHERE_FROM = '2';
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
  saveInterestForm(value, valid) {
    value.WHERE_FROM = '2';
    this.loading = true;
    this.operationsService.saveInterestForm(this.currentUser.token, value)
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
