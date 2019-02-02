import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService, StorageService, LoansService, DecisionService,AuthenticationService } from '../../_services/index';
import { OptionsserviceService } from '../../_services/optionsservice.service';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { LevelModel } from '../../_models/level.model';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';

@Component({
  selector: 'app-backendsettings',
  templateUrl: './backendsettings.component.html',
  styleUrls: ['./backendsettings.component.css']
})
export class BackendsettingsComponent implements OnInit {
  required_documents:any;
  public vr = {
    bvnmustmatch: false,
    cardmustmatch: false,
    accountmustmatch: false,
  };

  public ol = {
    LOAN_PRODUCT_ID: '',
    OFFER_LETTER: '' 
  }

  geo_settings = {
    ENABLE_GEOFENCING: false,
    ADDRESS_TO_USE:'1',
    LGAS: [],
    STATE_ID: '',
    LGA: {
      LGA_ID: '',
      LGA: ''
    },
    LGS: [],
    GEOFENCE_DISTANCE:'10',
    ADDRESSTYPES:[]
  }
  directdebitform = {
    DIRECT_DEBIT_STATUS_CHECK: '',
    CANCEL_AFTER_HOW_MANY_CHECKS: '',
    GET_NOTIFIED: false,
    GET_NOTIFIED_EMAIL: '',
    ENABLE_AUTO_DEBIT_INSTRUCTION: false,
    TERMS_AND_CONDITIONS: ''
  }
  generalnotifications = {
    DUEREPAYMENT: '',
    DIRECTDEBIT: '',
    ADDING_CARDS: false,
    DOCUMENT_UPLOAD: '',
    GENERAL_NOTIFICATION_EMAIL: false,
    TERMS_AND_CONDITIONS: ''
  }
  @Input('is_dashboard') is_dashboard = false;
  @Input('is_approval') is_approval= true;
  is_edit = false;
  addingInterestRateBand = false;
  @Input('settings') settings=true;
  @Input('subview') subview;
  band = {
    "LENDER_ID": "",
    "LOWER_BAND": "",
    "HIGHER_BAND": "",
    "MINIMUM_RATE": "",
    "MAXIMUM_RATE": "",
    "MINIMUM_AMOUNT": "",
    "MAXIMUM_AMOUNT": "",
    "MINIMUM_DURATION": "",
    "MAXIMUM_DURATION": "",
    "LOAN_DURATION": "",
    "INTEREST_DURATION": "",
    "INTRREST_RATE_BAND_ID": ""
  }
  gateway = {
    "CHOOSE_PAYMENT_PROCESSOR": false,
    "ACTIVE_PAYMENT_GATEWAY": "1",
    "ALLOWED_CARD_TYPES": []
  }
  INTRREST_RATE_BAND_ID = 0;
  interest_bands: any;
  simpleSlider_ = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
  banks: any;
  analytics_settings = {
    profile: "0",
    address: "0",
    income: "0",
    work: "0",
    guarantor: "0",
    account: "0",
    education: "0",
    call_log: "0",
    linkedln: "0",
  }

  card_types = [
    { "value": "visa", "name": "Visa card" },
    { "value": "verve", "name": "Verve card" },
    { "value": "master", "name": "Master card" }
  ]

  ownership_status = [
    { "id": "1", "name": "Owned" },
    { "id": "2", "name": "Rented" }
  ]

  gateways = [
    { "display": "Paystack", "value": "2" },
    { "display": "Flutterwave", "value": "1" }
  ]

  general_analytics_settings = {
    ENABLE_ANALYTICS: "0",
    MIN_NO_OF_CHILDREN: '',
    MAX_NO_OF_CHILDREN: '',
    MIN_DEPENDANTS: '',
    MAX_DEPENDANTS: '',
    PREFERRED_OWNERSHIP_STATUS: [],
    MIN_NO_OF_RESIDENCE_YR: '',
    MIN_YRS_SINCE_GRADUATION: '',
    MIN_QUALIFICATION: '',
    MAX_NO_EDUCATION_UPDATE: '',
    MIN_JOB_GRADE: '',
    MIN_YRS_IN_CURRENT_EMP: '',
    MIN_TOTAL_EXPENSES: '',
    MAX_TOTAL_EXPENSES: '',
    MIN_MONTHLY_RENT_EXPENSE: '',
    MAX_MONTHLY_RENT_EXPENSE: '',
    MIN_MONTHLY_TEL_INTERNET: '',
    MAX_MONTHLY_TEL_INTERNET: '',
    MIN_MONTHLY_TRANSPORT: '',
    MAX_MONTHLY_TRANSPORT: '',
    MIN_SCH_FEES_EXPENSES: '',
    MAX_SCH_FEES_EXPENSES: '',
    MIN_FEEDING_EXPENSES: '',
    MAX_FEEDING_EXPENSES: '',
    MAX_MONTHLY_DEDUCTIONS: '',
    MAX_TOTAL_EXPENSES_2_INCOME: '',
    MAX_ANNUAL_RENT_3_ANNUAL_INCCOME: '',
    MAX_TFARE_2_INCOME: '',
    MAX_FEEDING_2_INCOME: '',
    MAX_INTERNET_2_INCOME: '',
    MAX_SCH_2_INCOME: '',
    MAX_GUARANTOR_RESPOND_TIME: '',
    PREFERRED_GUARANTOR_OWNERSHIP_STATUS: [],
    ALLOWABLE_GUARANTOR_JOB_SECTOR: [],
    MIN_GUARANTOR_JOB_GRADE: '',
    MAX_GUARANTOR_LOAN_INCOME_RATIO: '',
    MIN_GUARANTOR_RESIDENCE_YRS: '',
    ACCEPTED_BANKS: [],
    MIN_PROVIDED_ACCOUNTS: '',
    MAX_PROVIDED_ACCOUNTS: '',
    ACCEPTED_CARD_BANKS: [],
    ACCEPTED_CARD_TYPE: [],
    MAX_NO_OF_OUTGOING_INT_CALLS_MONTHLY: '',
    MAX_NO_OF_INCOMING_INT_CALLS_MONTHLY: '',
    EXCLUDED_CALL_COUNTRY: [],
    ACCEPTED_CALL_COUNTRY: [],
    MAX_CALL_COST: '',
    ACCEPTED_OUTGOING_TIMEBELT: [],
    ACCEPTED_INCOMING_TIMEBELT: [],
    CALL_CHARGES_KOBO_PER_SECOND: '',
    MIN_DISTANCE_HOME_2_OFFICE: '',
    MAX_DISTANCE_HOME_2_OFFICE: '',
    MIN_DISTANCE_HOME_2_APPLICATION_POINT: '',
    MAX_DISTANCE_HOME_2_APPLICATION_POINT: '',
    MIN_DISTANCE_OFFICE_2_APPLICATION_POINT: '',
    MAX_DISTANCE_OFFICE_2_APPLICATION_POINT: ''
  }
  reminders = {
    DAYS_TO: '0',
    REMINDER_INTERVAL: '0',
    AUTODEBIT_INTERVAL: '4',
    REPAYMENT_SOURCE: '0',
    NOTIFY_REPAYMENT_MADE: false,
    NOTIFY_REPAYMENT_EMAIL: ''
  }
  mail_settings = {
    HAS_SMTP: false,
    SMTP_SERVER: '',
    SMTP_USERNAME: '',
    SMTP_PASSWORD: '',
    SMTP_PORT: '',
    USE_SSL: true,
    SMTP_PORT_: '',
    SMS_DISPLAY_NAME: '',
    USE_SENDGRID: false,
    SG_API: '',
    SG_EMAIL: '',
    SG_USERNAME: ''
  }
  security = {
    REQUIRE_SECURITY_QUESTION: false
  }
  investors = {
    MAXIMUM_INVESTMENT_PERCENT: '',
  }
  
  required_documents_guarantors:any;
  guarantor_requirements = {
    guarantor_requirements: [],
    SEND_GUARANTOR_INVITES: false,
    GUARANTOR_TERMS_AND_CONDITIONS:''
  }
  enable_peer = '0';
  referral_settings = {
    REFERRAL_TYPE: '1',
    AMOUNT_PER_REFERRAL_CASH: '0',
    AMOUNT_PER_REFERRAL_POINTS: '0',
    POINTS_CONVERSION_TO_CASH: '0',
    REFERRAL_BONUS_EARNED_WHEN: '1',
    REFERRAL_BONUS_TYPE: '1',
    REFERRAL_CONVERSION_TYPE: '3',
    REFERRAL_PERCENTAGE_ON_INTEREST: '0',
    REFERRAL_PERCENTAGE_ON_PRINCIPAL: '0',
    REFERRAL_PERCENTAGE_ON: '1',
    ENABLE_REFERRAL: false
  }
  employees: any;
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
  public fines_settings = {
    ENABLE_FINES: false,
    FINES_PERCENT_VALUE: '0',
    FINES_FLAT_VALUE: '0',
    FINES_ACCOUNT: '0'
  }
  public contract = {
    MUST_ACCEPT_CONTRACT: false,
    SEND_CONTRACT_DOCS: false,
    REQUEST_FOR_BVN: false,
    REQUEST_FOR_CARD: false,
    REQUEST_FOR_ACCOUNT: false,
    ENABLE_CONTRACT_SIGNATURE: false,
    ADJUST_CONTRACT_DATE: false,
    NOTIFY_CONTRACT_ACCEPTED: false,
    CONTRACT_ACCEPTED_EMAIL: '',
    REQUEST_FOR_DIRECT_DEBIT: false
  }
  public payment = {
    ALLOW_AUTO_APPROVE_PAYMENT: false,
    AUTO_APPROVE_PAYMENT_AMOUNT: '0',
    SEND_PAYMENTS_TO_QUEUE: false,
    ALLOW_PART_PAYMENT: false
  }
  public fee_settings = {
    FEE_TYPE: '0',
    FEE_PERCENT_VALUE: '0',
    FEE_FLAT_VALUE: '0',
    FEES_ACCOUNT: '0',
    CARD_REQUEST_FEE: '0'
  }
  public management_fee = {
    FEE_TYPE: '0',
    FEE_PERCENT_VALUE: '0',
    FEE_FLAT_VALUE: '0',
    MANAGEMENT_FEE_ACCOUNT: '0'
  }
  public qualified_borrowers = {
    MIN_SALARY_ACCEPTABLE: '0',
    LOAN_PRODUCT_ID: '0',
    MIN_AGE: '0',
    MAX_AGE: '0',
    ALLOWED_MARITAL_STATUS: [],
    ALLOWED_ADDRESS_STATES: []
  }
  APPROVAL_LEVEL_ID_: any;
  level: LevelModel;
  public loan_currency = "NGN";
  public loan_duration = 'Months';
  public max_loan_duration = 'Months';
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
  countries: any;
  public currentUser: any;
  isedit = false;
  loading = false;

  public acc_off: any;
  public app_levels: any;
  public loan_approvals: any;
  public backend = {
    SEND_IF_INELIGIBILE: false,
    INELIGIBLE_MESSAGE: '',
    SUSPEND_IF_FAIL_ELIGIBILITY: false,
    SUSPEND_FOR_HOW_LONG: 24,
    enableautorouting: true,
    defaultofficer: '',
    autorouter_size: 0,
    autorouter: [],
    enable_p2p: false,
    enable_accounting: true,
    PROFILE_ELIGIBILITY: false,
    INCOME_ELIGIBILITY: false,
    RATING_ELIGIBILITY: false,
    DEFAULT_AMOUNT_ELIGIBILITY: false,
    CARD_ELIGIBILITY: false,
    BVN_ELIGIBILITY: false,
    MINIMUM_RATINGS_ID: 0,
    ALLOW_AUTO_DISBURSE: false,
    AUTO_DISBURSE_AMOUNT: '0',
    SUCCESSFUL_LOANS: '0',
    BVN_DONE_AUTODISBURSE: false,
    CANCEL_AFTER_FAILED: false,
    RETRY_OTP: false,
    BANK_ACCOUNT_ELIGIBILITY: false,
    MAX_DURATION_FOR_LOAN_MARKET: '0',
    NOT_FUNDED_ACTION: '1',
    SEND_CANCELLATION_MESSAGE: false,
    CANCELLATION_MESSAGE: '',
    MAKE_EVERYONE_ANONYMOUS: true,
    ENABLE_BULK_DISBURSEMENT: false,
    VIEW_INELIGIBLE_REQUESTS: false
  };
  public break_settings = {
    ALLOW_AUTOBREAK: true,
    ENABLE_PREMATURITY_PENALTY: false,
    PREMATURITY_ACTION: '0',
    HOW_MANY_INTEREST: '0',
    PERCENTAGE_FINE: '0',
    FLAT_FINE: '0',
    INTEREST_CALCULATION:'2'
  };
  public loandefault = {
    LOAN_DEFAULT_DURATION: '0',
    AUTOROLLOVER: false,
    ROLLOVERDURATION: '0',
    ROLLOVERFEESPERCENT: '0',
    ROLLOVERFEESFLAT: '0',
    LOAN_LATE_DURATION: '0',
    LOAN_DELIQUENT_DURATION: '0'
  };
  public accounts = {
    DISBURSEMENT_FROM_LOAN: false,
    LOAN_PRODUCT_ID: '0'
  };
  addingAutoRouter = false;
  selected: any;
  feetypes = [
    { value: '0', display: 'Percentage' },
    { value: '1', display: 'Fixed' }
  ];
  notactions = [
    { value: '0', display: '--select--' },
    { value: '1', display: 'Extend duration' },
    { value: '2', display: 'Remove from market' }
  ];
  guarantors = [
    { value: '1', display: 'Phone' },
    { value: '2', display: 'Home Address' },
    { value: '3', display: 'Work Information' },
    { value: '4', display: 'Bank Account' },
    { value: '5', display: 'Repayment Card' }, 
    { value: '6', display: 'Social' },
  ];
  sectors: any;
  occupations: any;
  overlayOpen = false;
  overlayOpen_ = false;
  customeraccountsettings = {
    CUSTOMER_ACCOUNT_PART_ONE: "",
    CUSTOMER_ACCOUNT_RANGE_ONE: "",
    CUSTOMER_ACCOUNT_RANGE_TWO: "",
    INCLUDE_BRANCH_CODE_PREFIX: false,
    INCLUDE_ACCOUNT_TYPE_CODE: false,
    SAMPLE_CA: "",
  }
  states: any;
  lgas: any;
  marital_statuses = [
    { value: '1', display: 'Single' },
    { value: '2', display: 'Married' },
    { value: '3', display: 'Divorced' },
    { value: '4', display: 'Widowed' }
  ];
  cards = [
    { VALUE: '1', DISPLAY: 'Mastercard' },
    { VALUE: '2', DISPLAY: 'Visa' },
    { VALUE: '3', DISPLAY: 'Interswitch Verve' }
  ];
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": '1', "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": '2', "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": '3', "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": '4', "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
    ;
  public interest_duration = 'Per Month';
  public special_interest_duration = 'Per Day';
  companyaccounts = [];
  public accountcards = [
    { value: '1', display: 'Home',checked:false,checked_:false },
    { value: '2', display: 'Office',checked:false,checked_:false },
    { value: '3', display: 'Request',checked:false,checked_:false }
  ];
  constructor(public authService:AuthenticationService,public toastr: ToastrService, 
    vcr: ViewContainerRef, public loansService: LoansService, 
    public optionsService: OptionsserviceService,
    private router: Router, public storageService: StorageService,
    public operationsService: OperationsService,
    public decisionService: DecisionService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
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
  education_qualifications: any;
  job_grades: any;
  job_sectors: any;
  ngOnInit() {
    this.optionsService.getOccupation(2).subscribe(sectors => this.sectors = sectors);
    this.optionsService.getOccupation(1).subscribe(sectors => this.occupations = sectors);
    this.optionsService.getCountries().subscribe(countries => {
      this.countries = countries;

    });
    this.loansService.getLoanProducts(this.currentUser.token, 0).subscribe(loan_products => {
      this.product = loan_products.default;
    });
    this.operationsService.getBankDetails(this.currentUser.token).subscribe(banks => {
      this.banks = banks;
    });

    this.operationsService.getEducationDetails(this.currentUser.token).subscribe(data => {
      this.education_qualifications = data;
    });

    this.operationsService.getJobDetails(this.currentUser.token).subscribe(data => {
      this.job_grades = data;
    });

    this.operationsService.getJobSector(this.currentUser.token).subscribe(data => {
      this.job_sectors = data;
    });
    this.operationsService.getAppSettings(this.currentUser.token)
      .subscribe(data => {

        this.required_documents_guarantors = data.required_documents_guarantors;
        this.gateway.CHOOSE_PAYMENT_PROCESSOR = data.gateway.CHOOSE_PAYMENT_PROCESSOR;
        this.gateway.ACTIVE_PAYMENT_GATEWAY = data.gateway.ACTIVE_PAYMENT_GATEWAY;

        this.gateway.ALLOWED_CARD_TYPES = data.gateway.ALLOWED_CARD_TYPES;

        this.contract.MUST_ACCEPT_CONTRACT = data.contract.MUST_ACCEPT_CONTRACT;
        this.contract.SEND_CONTRACT_DOCS = data.contract.SEND_CONTRACT_DOCS;
        this.contract.REQUEST_FOR_ACCOUNT = data.contract.REQUEST_FOR_ACCOUNT;
        this.contract.REQUEST_FOR_BVN = data.contract.REQUEST_FOR_BVN;
        this.contract.REQUEST_FOR_CARD = data.contract.REQUEST_FOR_CARD;
        this.contract.ENABLE_CONTRACT_SIGNATURE = data.contract.ENABLE_CONTRACT_SIGNATURE;
        this.contract.ADJUST_CONTRACT_DATE = data.contract.ADJUST_CONTRACT_DATE;
        this.contract.NOTIFY_CONTRACT_ACCEPTED = data.contract.NOTIFY_CONTRACT_ACCEPTED;
        this.contract.CONTRACT_ACCEPTED_EMAIL = data.contract.CONTRACT_ACCEPTED_EMAIL;
        this.contract.REQUEST_FOR_DIRECT_DEBIT = data.contract.REQUEST_FOR_DIRECT_DEBIT;

        this.general_analytics_settings.EXCLUDED_CALL_COUNTRY = data.general_analytics_settings.EXCLUDED_CALL_COUNTRY;
        this.general_analytics_settings.ACCEPTED_CALL_COUNTRY = data.general_analytics_settings.ACCEPTED_CALL_COUNTRY;
        this.general_analytics_settings.MIN_NO_OF_CHILDREN = data.general_analytics_settings.MIN_NO_OF_CHILDREN;
        this.general_analytics_settings.MAX_NO_OF_CHILDREN = data.general_analytics_settings.MAX_NO_OF_CHILDREN;
        this.general_analytics_settings.MIN_DEPENDANTS = data.general_analytics_settings.MIN_DEPENDANTS;
        this.general_analytics_settings.MAX_DEPENDANTS = data.general_analytics_settings.MAX_DEPENDANTS;
        this.general_analytics_settings.PREFERRED_OWNERSHIP_STATUS = data.general_analytics_settings.PREFERRED_OWNERSHIP_STATUS;
        this.general_analytics_settings.MIN_NO_OF_RESIDENCE_YR = data.general_analytics_settings.MIN_NO_OF_RESIDENCE_YR;
        this.general_analytics_settings.MIN_YRS_SINCE_GRADUATION = data.general_analytics_settings.MIN_YRS_SINCE_GRADUATION;
        this.general_analytics_settings.MIN_QUALIFICATION = data.general_analytics_settings.MIN_QUALIFICATION;
        this.general_analytics_settings.MAX_NO_EDUCATION_UPDATE = data.general_analytics_settings.MAX_NO_EDUCATION_UPDATE;
        this.general_analytics_settings.MIN_JOB_GRADE = data.general_analytics_settings.MIN_JOB_GRADE;
        this.general_analytics_settings.MIN_YRS_IN_CURRENT_EMP = data.general_analytics_settings.MIN_YRS_IN_CURRENT_EMP;
        this.general_analytics_settings.MIN_TOTAL_EXPENSES = data.general_analytics_settings.MIN_TOTAL_EXPENSES;
        this.general_analytics_settings.MAX_TOTAL_EXPENSES = data.general_analytics_settings.MAX_TOTAL_EXPENSES;
        this.general_analytics_settings.MIN_MONTHLY_RENT_EXPENSE = data.general_analytics_settings.MIN_MONTHLY_RENT_EXPENSE;
        this.general_analytics_settings.MAX_MONTHLY_RENT_EXPENSE = data.general_analytics_settings.MAX_MONTHLY_RENT_EXPENSE;
        this.general_analytics_settings.MIN_MONTHLY_TEL_INTERNET = data.general_analytics_settings.MIN_MONTHLY_TEL_INTERNET;
        this.general_analytics_settings.MAX_MONTHLY_TEL_INTERNET = data.general_analytics_settings.MAX_MONTHLY_TEL_INTERNET;
        this.general_analytics_settings.MIN_MONTHLY_TRANSPORT = data.general_analytics_settings.MIN_MONTHLY_TRANSPORT;
        this.general_analytics_settings.MAX_MONTHLY_TRANSPORT = data.general_analytics_settings.MAX_MONTHLY_TRANSPORT;
        this.general_analytics_settings.MIN_SCH_FEES_EXPENSES = data.general_analytics_settings.MIN_SCH_FEES_EXPENSES;
        this.general_analytics_settings.MAX_SCH_FEES_EXPENSES = data.general_analytics_settings.MAX_SCH_FEES_EXPENSES;
        this.general_analytics_settings.MIN_FEEDING_EXPENSES = data.general_analytics_settings.MIN_FEEDING_EXPENSES;
        this.general_analytics_settings.MAX_FEEDING_EXPENSES = data.general_analytics_settings.MAX_FEEDING_EXPENSES;
        this.general_analytics_settings.MAX_MONTHLY_DEDUCTIONS = data.general_analytics_settings.MAX_MONTHLY_DEDUCTIONS;
        this.general_analytics_settings.MAX_TOTAL_EXPENSES_2_INCOME = data.general_analytics_settings.MAX_TOTAL_EXPENSES_2_INCOME;
        this.general_analytics_settings.MAX_ANNUAL_RENT_3_ANNUAL_INCCOME = data.general_analytics_settings.MAX_ANNUAL_RENT_3_ANNUAL_INCCOME;
        this.general_analytics_settings.MAX_TFARE_2_INCOME = data.general_analytics_settings.MAX_TFARE_2_INCOME;
        this.general_analytics_settings.MAX_INTERNET_2_INCOME = data.general_analytics_settings.MAX_INTERNET_2_INCOME;
        this.general_analytics_settings.MAX_SCH_2_INCOME = data.general_analytics_settings.MAX_SCH_2_INCOME;
        this.general_analytics_settings.MAX_GUARANTOR_RESPOND_TIME = data.general_analytics_settings.MAX_GUARANTOR_RESPOND_TIME;
        this.general_analytics_settings.PREFERRED_GUARANTOR_OWNERSHIP_STATUS = data.general_analytics_settings.PREFERRED_GUARANTOR_OWNERSHIP_STATUS;
        this.general_analytics_settings.ALLOWABLE_GUARANTOR_JOB_SECTOR = data.general_analytics_settings.ALLOWABLE_GUARANTOR_JOB_SECTOR;
        this.general_analytics_settings.MIN_GUARANTOR_JOB_GRADE = data.general_analytics_settings.MIN_GUARANTOR_JOB_GRADE;
        this.general_analytics_settings.MAX_GUARANTOR_LOAN_INCOME_RATIO = data.general_analytics_settings.MAX_GUARANTOR_LOAN_INCOME_RATIO;
        this.general_analytics_settings.MIN_GUARANTOR_RESIDENCE_YRS = data.general_analytics_settings.MIN_GUARANTOR_RESIDENCE_YRS;
        this.general_analytics_settings.ACCEPTED_BANKS = data.general_analytics_settings.ACCEPTED_BANKS;
        this.general_analytics_settings.MIN_PROVIDED_ACCOUNTS = data.general_analytics_settings.MIN_PROVIDED_ACCOUNTS;
        this.general_analytics_settings.MAX_PROVIDED_ACCOUNTS = data.general_analytics_settings.MAX_PROVIDED_ACCOUNTS;
        this.general_analytics_settings.ACCEPTED_CARD_BANKS = data.general_analytics_settings.ACCEPTED_CARD_BANKS;
        this.general_analytics_settings.ACCEPTED_CARD_TYPE = data.general_analytics_settings.ACCEPTED_CARD_TYPE;
        this.general_analytics_settings.MAX_NO_OF_OUTGOING_INT_CALLS_MONTHLY = data.general_analytics_settings.MAX_NO_OF_OUTGOING_INT_CALLS_MONTHLY;
        this.general_analytics_settings.MAX_NO_OF_INCOMING_INT_CALLS_MONTHLY = data.general_analytics_settings.MAX_NO_OF_INCOMING_INT_CALLS_MONTHLY;
        this.general_analytics_settings.MAX_CALL_COST = data.general_analytics_settings.MAX_CALL_COST;
        this.general_analytics_settings.ACCEPTED_OUTGOING_TIMEBELT = data.general_analytics_settings.ACCEPTED_OUTGOING_TIMEBELT;
        this.general_analytics_settings.ACCEPTED_INCOMING_TIMEBELT = data.general_analytics_settings.ACCEPTED_INCOMING_TIMEBELT;
        this.general_analytics_settings.CALL_CHARGES_KOBO_PER_SECOND = data.general_analytics_settings.CALL_CHARGES_KOBO_PER_SECOND;
        this.general_analytics_settings.MIN_DISTANCE_HOME_2_OFFICE = data.general_analytics_settings.MIN_DISTANCE_HOME_2_OFFICE;
        this.general_analytics_settings.MAX_DISTANCE_HOME_2_OFFICE = data.general_analytics_settings.MAX_DISTANCE_HOME_2_OFFICE;
        this.general_analytics_settings.MIN_DISTANCE_HOME_2_APPLICATION_POINT = data.general_analytics_settings.MIN_DISTANCE_HOME_2_APPLICATION_POINT;
        this.general_analytics_settings.MAX_DISTANCE_HOME_2_APPLICATION_POINT = data.general_analytics_settings.MAX_DISTANCE_HOME_2_APPLICATION_POINT;
        this.general_analytics_settings.MIN_DISTANCE_OFFICE_2_APPLICATION_POINT = data.general_analytics_settings.MIN_DISTANCE_OFFICE_2_APPLICATION_POINT;
        this.general_analytics_settings.MAX_DISTANCE_OFFICE_2_APPLICATION_POINT = data.general_analytics_settings.MAX_DISTANCE_OFFICE_2_APPLICATION_POINT;

        this.analytics_settings.profile = data.analytics.profile;
        this.analytics_settings.address = data.analytics.address;
        this.analytics_settings.income = data.analytics.income;
        this.analytics_settings.work = data.analytics.work;
        this.analytics_settings.guarantor = data.analytics.guarantor;
        this.analytics_settings.account = data.analytics.account;
        this.analytics_settings.education = data.analytics.education;
        this.analytics_settings.call_log = data.analytics.call_log;
        this.analytics_settings.linkedln = data.analytics.linkedln;

        this.employees = data.accoff;
        this.acc_off = data.accoff;
        this.app_levels = data.app_levels;
        this.loan_approvals = data.product.APP_LIST;
        this.backend.SEND_IF_INELIGIBILE = data.backend.SEND_IF_INELIGIBILE;
        this.backend.INELIGIBLE_MESSAGE = data.backend.INELIGIBLE_MESSAGE;
        this.backend.SUSPEND_FOR_HOW_LONG = data.backend.SUSPEND_FOR_HOW_LONG;
        this.backend.ENABLE_BULK_DISBURSEMENT = data.backend.ENABLE_BULK_DISBURSEMENT;
        this.backend.SUSPEND_IF_FAIL_ELIGIBILITY = data.backend.SUSPEND_IF_FAIL_ELIGIBILITY;
        this.backend.enableautorouting = data.backend.enableautorouting;
        this.backend.defaultofficer = data.backend.defaultofficer;
        this.backend.autorouter_size = data.backend.AUTO_ROUTER_SIZE;
        this.backend.autorouter = data.backend.AUTO_ROUTER;
        this.backend.enable_p2p = data.backend.ENABLE_PEER;
        this.backend.MAX_DURATION_FOR_LOAN_MARKET = data.backend.MAX_DURATION_FOR_LOAN_MARKET;
        this.backend.NOT_FUNDED_ACTION = data.backend.NOT_FUNDED_ACTION;
        this.backend.SEND_CANCELLATION_MESSAGE = data.backend.SEND_CANCELLATION_MESSAGE;
        this.backend.CANCELLATION_MESSAGE = data.backend.CANCELLATION_MESSAGE;
        this.backend.MAKE_EVERYONE_ANONYMOUS = data.backend.MAKE_EVERYONE_ANONYMOUS;
        this.backend.enable_accounting = data.backend.ENABLE_ACCOUNTING;
        this.backend.PROFILE_ELIGIBILITY = data.backend.PROFILE_ELIGIBILITY;
        this.backend.INCOME_ELIGIBILITY = data.backend.INCOME_ELIGIBILITY;
        this.backend.RATING_ELIGIBILITY = data.backend.RATING_ELIGIBILITY;
        this.backend.DEFAULT_AMOUNT_ELIGIBILITY = data.backend.DEFAULT_AMOUNT_ELIGIBILITY;
        this.backend.CARD_ELIGIBILITY = false;
        this.backend.BVN_ELIGIBILITY = data.backend.BVN_ELIGIBILITY;
        this.backend.MINIMUM_RATINGS_ID = data.backend.MINIMUM_RATINGS_ID;
        this.backend.ALLOW_AUTO_DISBURSE = data.backend.ALLOW_AUTO_DISBURSE;
        this.backend.AUTO_DISBURSE_AMOUNT = data.backend.AUTO_DISBURSE_AMOUNT;
        this.backend.SUCCESSFUL_LOANS = data.backend.SUCCESSFUL_LOANS;
        this.backend.BVN_DONE_AUTODISBURSE = data.backend.BVN_DONE_AUTODISBURSE;
        this.backend.CANCEL_AFTER_FAILED = data.backend.CANCEL_AFTER_FAILED;
        this.backend.RETRY_OTP = data.backend.RETRY_OTP;
        this.backend.BANK_ACCOUNT_ELIGIBILITY = data.backend.BANK_ACCOUNT_ELIGIBILITY;
        this.backend.VIEW_INELIGIBLE_REQUESTS = data.backend.VIEW_INELIGIBLE_REQUESTS;
        this.loandefault.LOAN_DEFAULT_DURATION = data.backend.LOAN_DEFAULT_DURATION;
        this.loandefault.LOAN_LATE_DURATION = data.backend.LOAN_LATE_DURATION;
        this.loandefault.AUTOROLLOVER = data.backend.AUTOROLLOVER;
        this.loandefault.ROLLOVERDURATION = data.backend.ROLLOVERDURATION;
        this.loandefault.ROLLOVERFEESFLAT = data.backend.ROLLOVERFEESFLAT;
        this.loandefault.ROLLOVERFEESPERCENT = data.backend.ROLLOVERFEESPERCENT;
        this.loandefault.LOAN_DELIQUENT_DURATION = data.backend.LOAN_DELIQUENT_DURATION;
        this.fee_settings.FEE_TYPE = data.fees.FEE_TYPE;
        this.fee_settings.FEE_FLAT_VALUE = data.fees.TOTAL_FLAT_FEES;
        this.fee_settings.FEE_PERCENT_VALUE = data.fees.TOTAL_PERCENTAGE_FEES;
        this.fee_settings.FEES_ACCOUNT = data.fees.FEES_ACCOUNT;
        this.fee_settings.CARD_REQUEST_FEE = data.fees.CARD_REQUEST_FEE;

        this.fines_settings.ENABLE_FINES = data.fines.ENABLE_FINES;
        this.fines_settings.FINES_FLAT_VALUE = data.fines.FINES_FLAT_VALUE;
        this.fines_settings.FINES_PERCENT_VALUE = data.fines.FINES_PERCENT_VALUE;
        this.fines_settings.FINES_ACCOUNT = data.fees.FINES_ACCOUNT;

        this.payment.ALLOW_AUTO_APPROVE_PAYMENT = data.payments.ALLOW_AUTO_APPROVE_PAYMENT;
        this.payment.AUTO_APPROVE_PAYMENT_AMOUNT = data.payments.AUTO_APPROVE_PAYMENT_AMOUNT;
        this.payment.SEND_PAYMENTS_TO_QUEUE = data.payments.SEND_PAYMENTS_TO_QUEUE;
        this.payment.ALLOW_PART_PAYMENT = data.payments.ALLOW_PART_PAYMENT;

        this.directdebitform.DIRECT_DEBIT_STATUS_CHECK = data.directdebit.DIRECT_DEBIT_STATUS_CHECK;
        this.directdebitform.CANCEL_AFTER_HOW_MANY_CHECKS = data.directdebit.CANCEL_AFTER_HOW_MANY_CHECKS;
        this.directdebitform.GET_NOTIFIED = data.directdebit.GET_NOTIFIED;
        this.directdebitform.GET_NOTIFIED_EMAIL = data.directdebit.GET_NOTIFIED_EMAIL;
        this.directdebitform.ENABLE_AUTO_DEBIT_INSTRUCTION = data.directdebit.ENABLE_AUTO_DEBIT_INSTRUCTION;
        this.directdebitform.TERMS_AND_CONDITIONS = data.directdebit.TERMS_AND_CONDITIONS;

        this.generalnotifications.DUEREPAYMENT = data.generalnotifications.DUEREPAYMENT;
        this.generalnotifications.DIRECTDEBIT = data.generalnotifications.DIRECTDEBIT;
        this.generalnotifications.ADDING_CARDS = data.generalnotifications.ADDING_CARDS;
        this.generalnotifications.DOCUMENT_UPLOAD = data.generalnotifications.DOCUMENT_UPLOAD;
        this.generalnotifications.GENERAL_NOTIFICATION_EMAIL = data.generalnotifications.GENERAL_NOTIFICATION_EMAIL;

        this.break_settings.ALLOW_AUTOBREAK = data.break_settings.ALLOW_AUTOBREAK;
        this.break_settings.ENABLE_PREMATURITY_PENALTY = data.break_settings.ENABLE_PREMATURITY_PENALTY;
        this.break_settings.PREMATURITY_ACTION = data.break_settings.PREMATURITY_ACTION;
        this.break_settings.HOW_MANY_INTEREST = data.break_settings.HOW_MANY_INTEREST;
        this.break_settings.PERCENTAGE_FINE = data.break_settings.PERCENTAGE_FINE;
        this.break_settings.FLAT_FINE = data.break_settings.FLAT_FINE;
        this.break_settings.INTEREST_CALCULATION = data.break_settings.INTEREST_CALCULATION;

        this.management_fee.FEE_TYPE = data.management_fee.FEE_TYPE;
        this.management_fee.FEE_FLAT_VALUE = data.management_fee.TOTAL_FLAT_FEES;
        this.management_fee.FEE_PERCENT_VALUE = data.management_fee.TOTAL_PERCENTAGE_FEES;
        this.management_fee.MANAGEMENT_FEE_ACCOUNT = data.management_fee.MANAGEMENT_FEE_ACCOUNT;

        this.accounts.DISBURSEMENT_FROM_LOAN = data.disbursement.DISBURSEMENT_FROM_LOAN;
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

        this.qualified_borrowers.MIN_SALARY_ACCEPTABLE = data.product.MIN_SALARY_ACCEPTABLE;
        this.qualified_borrowers.LOAN_PRODUCT_ID = data.product.LOAN_PRODUCT_ID;
        this.qualified_borrowers.MIN_AGE = data.product.MIN_AGE;
        this.qualified_borrowers.MAX_AGE = data.product.MAX_AGE;
        this.qualified_borrowers.ALLOWED_MARITAL_STATUS = data.product.ALLOWED_MARITAL_STATUS;
        this.qualified_borrowers.ALLOWED_ADDRESS_STATES = data.product.ALLOWED_ADDRESS_STATES;

        this.guarantor_requirements.guarantor_requirements = data.product.GUARANTOR_REQUIREMENTS;
        this.guarantor_requirements.SEND_GUARANTOR_INVITES = data.product.SEND_GUARANTOR_INVITES;
        this.guarantor_requirements.GUARANTOR_TERMS_AND_CONDITIONS = data.product.GUARANTOR_TERMS_AND_CONDITIONS;

        this.mail_settings.HAS_SMTP = data.mail_settings.HAS_SMTP;
        this.mail_settings.SMTP_SERVER = data.mail_settings.SMTP_SERVER;
        this.mail_settings.SMTP_USERNAME = data.mail_settings.SMTP_USERNAME;
        this.mail_settings.SMTP_PASSWORD = data.mail_settings.SMTP_PASSWORD;
        this.mail_settings.SMTP_PORT = data.mail_settings.SMTP_PORT;
        this.mail_settings.USE_SSL = data.mail_settings.USE_SSL;
        this.mail_settings.SMTP_PORT_ = data.mail_settings.SMTP_PORT_;
        this.mail_settings.SMS_DISPLAY_NAME = data.mail_settings.SMS_DISPLAY_NAME;

        this.mail_settings.USE_SENDGRID = data.mail_settings.USE_SENDGRID;
        this.mail_settings.SG_API = data.mail_settings.SG_API;
        this.mail_settings.SG_EMAIL = data.mail_settings.SG_EMAIL;
        this.mail_settings.SG_USERNAME = data.mail_settings.SG_USERNAME;

        this.security.REQUIRE_SECURITY_QUESTION = data.security.REQUIRE_SECURITY_QUESTION;

        this.reminders.DAYS_TO = data.reminders.DAYS_TO;
        this.reminders.REMINDER_INTERVAL = data.reminders.REMINDER_INTERVAL;
        this.reminders.AUTODEBIT_INTERVAL = data.reminders.AUTODEBIT_INTERVAL;
        this.reminders.REPAYMENT_SOURCE = data.reminders.REPAYMENT_SOURCE;
        this.reminders.NOTIFY_REPAYMENT_MADE = data.reminders.NOTIFY_REPAYMENT_MADE;
        this.reminders.NOTIFY_REPAYMENT_EMAIL = data.reminders.NOTIFY_REPAYMENT_EMAIL;

        this.investors.MAXIMUM_INVESTMENT_PERCENT = data.investors.MAXIMUM_INVESTMENT_PERCENT;

        this.states = data.states;
        this.lgas = data.lgas;

        this.referral_settings.AMOUNT_PER_REFERRAL_CASH = data.referral.AMOUNT_PER_REFERRAL_CASH;
        this.referral_settings.AMOUNT_PER_REFERRAL_POINTS = data.referral.AMOUNT_PER_REFERRAL_POINTS;
        this.referral_settings.POINTS_CONVERSION_TO_CASH = data.referral.POINTS_CONVERSION_TO_CASH;
        this.referral_settings.REFERRAL_TYPE = data.referral.REFERRAL_TYPE;

        this.referral_settings.REFERRAL_BONUS_EARNED_WHEN = data.referral.REFERRAL_BONUS_EARNED_WHEN;
        this.referral_settings.REFERRAL_BONUS_TYPE = data.referral.REFERRAL_BONUS_TYPE;
        this.referral_settings.REFERRAL_CONVERSION_TYPE = data.referral.REFERRAL_CONVERSION_TYPE;
        this.referral_settings.REFERRAL_PERCENTAGE_ON_INTEREST = data.referral.REFERRAL_PERCENTAGE_ON_INTEREST;
        this.referral_settings.REFERRAL_PERCENTAGE_ON_PRINCIPAL = data.referral.REFERRAL_PERCENTAGE_ON_PRINCIPAL;
        this.referral_settings.REFERRAL_PERCENTAGE_ON = data.referral.REFERRAL_PERCENTAGE_ON;
        this.referral_settings.ENABLE_REFERRAL = data.referral.ENABLE_REFERRAL;

        this.customeraccountsettings.CUSTOMER_ACCOUNT_PART_ONE = data.customeraccountsettings.CUSTOMER_ACCOUNT_PART_ONE;
        this.customeraccountsettings.CUSTOMER_ACCOUNT_RANGE_ONE = data.customeraccountsettings.CUSTOMER_ACCOUNT_RANGE_ONE;
        this.customeraccountsettings.CUSTOMER_ACCOUNT_RANGE_TWO = data.customeraccountsettings.CUSTOMER_ACCOUNT_RANGE_TWO;
        this.customeraccountsettings.INCLUDE_BRANCH_CODE_PREFIX = data.customeraccountsettings.INCLUDE_BRANCH_CODE_PREFIX;
        this.customeraccountsettings.INCLUDE_ACCOUNT_TYPE_CODE = data.customeraccountsettings.INCLUDE_ACCOUNT_TYPE_CODE;
        this.customeraccountsettings.SAMPLE_CA = data.customeraccountsettings.SAMPLE_CA;
        this.companyaccounts = data.accounts.a;

        this.geo_settings.LGAS = data.product.ALLOWED_LGAS
        this.geo_settings.LGS = data.product.LGA_IDS;
        this.geo_settings.ENABLE_GEOFENCING = data.product.ENABLE_GEOFENCING;
        this.geo_settings.ADDRESS_TO_USE = data.product.ADDRESS_TO_USE;
        this.geo_settings.GEOFENCE_DISTANCE = data.product.GEOFENCE_DISTANCE;
        this.geo_settings.ADDRESSTYPES = data.product.ADDRESS_TYPES;
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
        this.interest_bands = data.interest_bands;
        this.band.HIGHER_BAND = '0';
        this.band.LOWER_BAND = '0';
        this.band.MINIMUM_RATE = '0';
        this.band.MAXIMUM_RATE = '0';
        this.band.MINIMUM_AMOUNT = '0';
        this.band.MAXIMUM_AMOUNT = '0';
        this.band.MINIMUM_DURATION = '0';
        this.band.MAXIMUM_DURATION = '0';
        this.band.INTEREST_DURATION = '2';
        this.band.LOAN_DURATION = '2';
        this.band.INTRREST_RATE_BAND_ID = '0';
      });
  }
  addLGAToAllowedLGAS() {
    if (this.geo_settings.LGS.indexOf(this.geo_settings.LGA.LGA_ID) > -1) {

    } else {
      this.geo_settings.LGAS.push(this.geo_settings.LGA);
      this.geo_settings.LGS.push(this.geo_settings.LGA.LGA_ID);
    }
  }
  getLGAs(event) {
    this.optionsService.getLGAs(this.currentUser.token, event.target.value)
      .subscribe(data => {

        this.lgas = data.lgas;
      });
  }
  updateProfilePercentage(slider, event, type) {

    if (type == 'profile') {
      this.analytics_settings.profile = event.from;

    }

    if (type == 'address') {
      this.analytics_settings.address = event.from;
    }

    if (type == 'income') {
      this.analytics_settings.income = event.from;
    }

    if (type == 'work') {
      this.analytics_settings.work = event.from;
    }

    if (type == 'guarantor') {
      this.analytics_settings.guarantor = event.from;
    }

    if (type == 'account') {
      this.analytics_settings.account = event.from;
    }

    if (type == 'education') {
      this.analytics_settings.education = event.from;
    }

    if (type == 'call_log') {
      this.analytics_settings.call_log = event.from;
    }

    if (type == 'linkedln') {
      this.analytics_settings.linkedln = event.from;
    }

  }

  saveRecordsValidation(value, valid) {
    this.loading = true;
    this.operationsService.saveRecordsValidation(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }

  saveOL(value, valid) {
    this.loading = true;
    this.operationsService.saveOLSettings(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }

  onClickShowExecutor( setting ) {
    
  }
  
  saveDirectDebitSettings(value, valid) {

    this.loading = true;
    this.operationsService.saveDirectDebitSettings(this.currentUser.token, this.directdebitform)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveGeneralNotificationSettings(value, valid) {

    this.loading = true;
    this.operationsService.saveGeneralNotificationSettings(this.currentUser.token, this.generalnotifications)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveAnalytics(value, valid) {

    this.loading = true;
    this.operationsService.saveAnalytics(this.currentUser.token, this.analytics_settings)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }

  saveGeneralAnalytics(value, valid) {
    this.loading = true;
    this.operationsService.saveGeneralAnalytics(this.currentUser.token, this.general_analytics_settings)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  checkSector(sector, event, index) {
    this.sectors[index]["checked_"] = event;
  }
  checkCard(sector, event, index) {
    this.cards[index]["checked_"] = event;
  }
  checkOccupation(sector, event, index) {
    this.occupations[index]["checked_"] = event;

  }
  checkMaritalStatus(sector, event, index) {
    this.marital_statuses[index]["checked_"] = event;

  }
  checkGuarantorRequirement(event, index) {
    this.guarantors[index]["checked_"] = event;

  }
  checkAllowedState(sector, event, index) {
    this.states[index]["checked_"] = event;

  }
  checkAllowedAddressType(sector, event, index) {
    this.accountcards[index]["checked_"] = event;

  }
  changeCurrency(c) {
    this.loan_currency = c.currency[0];
    this.product.LOAN_CURRENCY = c.callingCode[0];
  }
  changeDuration(d, T) {
    if (T === 1) {
      this.loan_duration = this.loan_durations[d]["LOAN_DURATION"];
      this.product.LOAN_DURATION_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
      this.band.LOAN_DURATION = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
    }
    if (T === 2) {
      this.interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.product.LOAN_INTEREST_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
      this.band.INTEREST_DURATION = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
    }
    if (T === 3) {
      this.special_interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.product.LOAN_INTEREST_ON_AMOUNT_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }
  }
  saveForm(event) {
    this.save(event.value, event.valid);
  }
  saveFRFrom(event) {
    this.saveSpecialLoanInterest(event.value, event.valid)
  }
  saveLAFrom(event) {
    this.saveSpecialLoanInterest(event.value, event.valid)
  }
  saveOFFrom(event) {
    this.saveFee(event.value, event.valid);
  }


  saveContract(value, valid) {

    this.loading = true;
    this.operationsService.saveContract(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }


  saveInvestor(value, valid) {

    this.loading = true;
    this.operationsService.saveInvestor(this.currentUser.token, value)
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
  save(value, valid) {

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
  saveManagementFee(value, valid) {

    this.loading = true;
    this.operationsService.saveManagementFee(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveSecurity(value, valid) {

    this.loading = true;
    this.operationsService.saveSecurity(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveFines(value, valid) {

    this.loading = true;
    this.operationsService.saveFines(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveGeofencing(value, valid) {

    this.loading = true;
    this.operationsService.saveGeofencing(this.currentUser.token, value, this.geo_settings.LGAS, this.accountcards)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  savePayments(value, valid) {

    this.loading = true;
    this.operationsService.savePayments(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveBreakSettings(value, valid) {

    this.loading = true;
    this.operationsService.saveBreakSettings(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveQualifiedBorrowers(value, valid) {

    this.loading = true;
    this.operationsService.saveQualifiedBorrowers(this.currentUser.token, value, this.sectors, this.occupations, this.marital_statuses, this.states, this.guarantors, this.guarantor_requirements)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveGuarantorRequirements(value, valid) {

    this.loading = true;
    this.operationsService.saveGuarantorRequirements(this.currentUser.token, value, this.sectors, this.occupations, this.marital_statuses, this.states, this.guarantors, this.guarantor_requirements, this.required_documents_guarantors)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveMailSettings(value, valid) {

    this.loading = true;
    this.operationsService.saveMailSettings(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  savePaymentSettings(value, valid) {

    this.loading = true;
    this.operationsService.savePaymentSettings(this.currentUser.token, value, this.cards)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveSMSSettings(value, valid) {

    this.loading = true;
    this.operationsService.saveSMSSettings(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveReminders(value, valid) {

    this.loading = true;
    this.operationsService.saveReminders(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  editBand(band) {
    this.is_edit = true;
    this.INTRREST_RATE_BAND_ID = band.INTRREST_RATE_BAND_ID;
    this.band = band;
  }
  deleteBand(band) {
    this.loading = true;
    this.decisionService.deleteBand(this.currentUser.token, band)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
          this.interest_bands = data.data.bands
        } else {
          this.showError(data.message)
        }
      });
  }
  saveInterestRateBand(value, valid) {
    this.loading = true;
    this.decisionService.addBand(this.currentUser.token, value, this.INTRREST_RATE_BAND_ID)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
          this.interest_bands = data.data.bands
        } else {
          this.showError(data.message)
        }
      });
  }
  saveReferral(value, valid) {
    this.loading = true;
    this.operationsService.saveReferral(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }

  isAvailable(OCCUPATION_ID, sectors, index) {

    if (sectors == 'sector') {
      if (this.product.PREFERRED_OCCUPATION_SECTOR.indexOf(OCCUPATION_ID) > -1) {
        this.sectors[index].checked = true;

        return true;
      } else {
        return false;
      }

    }
    if (sectors == 'cards') {
      if (this.gateway.ALLOWED_CARD_TYPES.indexOf(OCCUPATION_ID) > -1) {
        this.sectors[index].checked = true;

        return true;
      } else {
        return false;
      }

    }
    if (sectors == 'occupation') {

      if (this.product.PREFERRED_BORROWER_OCCUPATION.indexOf(OCCUPATION_ID) > -1) {
        this.occupations[index].checked = true;
        return true;
      } else {
        return false;
      }

    }
  }
  isMaritalStatusAvailable(OCCUPATION_ID, index) {
    if (this.qualified_borrowers.ALLOWED_MARITAL_STATUS.indexOf(OCCUPATION_ID) > -1) {
      this.marital_statuses[index]["checked"] = true;
      return true;
    } else {
      return false;
    }

  }
  isGuarantorRequirementAvailable(OCCUPATION_ID, index) {

    if (this.guarantor_requirements.guarantor_requirements.indexOf(OCCUPATION_ID) > -1) {
      this.guarantors[index]["checked"] = true
      return true;
    } else {
      return false;
    }
  }
  isStateAvailable(OCCUPATION_ID, index) {
    if (this.qualified_borrowers.ALLOWED_ADDRESS_STATES.indexOf(OCCUPATION_ID) > -1) {
      this.states[index]["checked"] = true;
      return true;
    } else {
      return false;
    }
  }
  isAddressTypeAvailable(OCCUPATION_ID, index) {
    if (this.geo_settings.ADDRESSTYPES.indexOf(OCCUPATION_ID) > -1) {
      this.accountcards[index]["checked"] = true;
      return true;
    } else {
      return false;
    }
  }
  update(level) {
    this.isedit = true;
    this.level = level;
    this.APPROVAL_LEVEL_ID_ = level.APPROVAL_LEVEL_ID_;
    this.overlayOpen = true;
  }
  saveLevel(event) {
    this.loading = true;
    this.operationsService.saveLevel(this.currentUser.token, event)
      .subscribe(status => {
        this.is_edit = false;
        this.loading = false;
        this.overlayOpen = false;
        if (status.status == true) {

          this.showSuccess(status.message)
          this.loan_approvals = status.app_levels
        } else {
          this.showError(status.message)
        }
      });
  }
  checkEmployee(event) {
    console.log(event)
    this.employees[event.index].CHECKED = event.event;
    console.log(this.employees)
  }
  deleteLevel(level) {
    this.loading = true;
    this.operationsService.deleteLevel(this.currentUser.token, level)
      .subscribe(status => {
        this.loading = false;
        this.overlayOpen = false;
        if (status.status == true) {

          this.showSuccess(status.message)
          this.loan_approvals = status.app_levels
        } else {
          this.showError(status.message)
        }
      });
  }
  saveAccounts(value, valid) {

    this.loading = true;
    this.operationsService.saveAccounts(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveAccPeer(value, valid) {
    this.loading = true;
    this.operationsService.saveAccPeer(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  closeIsNewEmp() {
    this.overlayOpen = false;
    this.is_edit = false;
    this.overlayOpen_ = false;
  }
  saveEligibility(value, valid) {
    this.loading = true;
    this.operationsService.saveEligibility(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveAutodisburse(value, valid) {
    this.loading = true;
    this.operationsService.saveAutodisburse(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  newLevel() {
    this.overlayOpen = false;
    this.overlayOpen_ = true;
  }
  saveautorouting(value, valid) {
    this.loading = true;
    this.operationsService.saveautorouting(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveRollover(value, valid) {
    this.loading = true;
    this.operationsService.saveRollover(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  changeFrequency(event) {
    if (event.target.value === '1') {
      this.product.REPAYMENT_TYPE_ID = '3';
    }
  }
  chooseLender(event) {
    this.selected = event;
    this.addingAutoRouter = false;
  }
  changeSampleCA() {
    this.customeraccountsettings.SAMPLE_CA = "";
    if (this.customeraccountsettings.INCLUDE_BRANCH_CODE_PREFIX == true) {
      this.customeraccountsettings.SAMPLE_CA += this.customeraccountsettings.CUSTOMER_ACCOUNT_PART_ONE;
    }
    this.customeraccountsettings.SAMPLE_CA += this.customeraccountsettings.CUSTOMER_ACCOUNT_RANGE_ONE;
    if (this.customeraccountsettings.INCLUDE_ACCOUNT_TYPE_CODE == true) {
      this.customeraccountsettings.SAMPLE_CA += "01";
    }
  }
  saveCustomerSettings(value, valid) {

  }
  addToExcludedCountries(event) {

    this.general_analytics_settings.EXCLUDED_CALL_COUNTRY.push(event.target.value)

  }
  removeFromExcludedCountries(id) {
    if (this.general_analytics_settings.EXCLUDED_CALL_COUNTRY.indexOf(id) > -1) {
      this.general_analytics_settings.EXCLUDED_CALL_COUNTRY.splice(this.general_analytics_settings.EXCLUDED_CALL_COUNTRY.indexOf(id), 1)
    }
  }
  isAvailableInexcludedCountries(dial_code) {
    if (this.general_analytics_settings.EXCLUDED_CALL_COUNTRY.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }

  addToAcceptedCountries(event) {

    this.general_analytics_settings.ACCEPTED_CALL_COUNTRY.push(event.target.value)

  }
  removeFromAcceptedCountries(id) {
    if (this.general_analytics_settings.ACCEPTED_CALL_COUNTRY.indexOf(id) > -1) {
      this.general_analytics_settings.ACCEPTED_CALL_COUNTRY.splice(this.general_analytics_settings.ACCEPTED_CALL_COUNTRY.indexOf(id), 1)
    }
  }
  isAvailableInacceptedCountries(dial_code) {
    if (this.general_analytics_settings.ACCEPTED_CALL_COUNTRY.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }

  addToAcceptedBanks(event) {

    this.general_analytics_settings.ACCEPTED_BANKS.push(event.target.value)

  }
  removeFromAcceptedBanks(id) {
    if (this.general_analytics_settings.ACCEPTED_BANKS.indexOf(id) > -1) {
      this.general_analytics_settings.ACCEPTED_BANKS.splice(this.general_analytics_settings.ACCEPTED_BANKS.indexOf(id), 1)
    }
  }
  isAvailableInacceptedBanks(dial_code) {
    if (this.general_analytics_settings.ACCEPTED_BANKS.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }

  addToCardType(event) {

    this.general_analytics_settings.ACCEPTED_CARD_TYPE.push(event.target.value)

  }
  removeFromCardType(id) {
    if (this.general_analytics_settings.ACCEPTED_CARD_TYPE.indexOf(id) > -1) {
      this.general_analytics_settings.ACCEPTED_CARD_TYPE.splice(this.general_analytics_settings.ACCEPTED_CARD_TYPE.indexOf(id), 1)
    }
  }
  isAvailableInCardType(dial_code) {
    if (this.general_analytics_settings.ACCEPTED_CARD_TYPE.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }

  addToOwnership(event) {

    this.general_analytics_settings.PREFERRED_OWNERSHIP_STATUS.push(event.target.value)

  }
  removeFromOwnership(id) {
    if (this.general_analytics_settings.PREFERRED_OWNERSHIP_STATUS.indexOf(id) > -1) {
      this.general_analytics_settings.PREFERRED_OWNERSHIP_STATUS.splice(this.general_analytics_settings.PREFERRED_OWNERSHIP_STATUS.indexOf(id), 1)
    }
  }
  isAvailableInOwnership(dial_code) {
    if (this.general_analytics_settings.PREFERRED_OWNERSHIP_STATUS.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }

  addToCardBanks(event) {

    this.general_analytics_settings.ACCEPTED_CARD_BANKS.push(event.target.value)

  }
  removeFromCardBanks(id) {
    if (this.general_analytics_settings.ACCEPTED_CARD_BANKS.indexOf(id) > -1) {
      this.general_analytics_settings.ACCEPTED_CARD_BANKS.splice(this.general_analytics_settings.ACCEPTED_CARD_BANKS.indexOf(id), 1)
    }
  }
  isAvailableInCardBanks(dial_code) {
    if (this.general_analytics_settings.ACCEPTED_CARD_BANKS.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }

  addToGuarantorOwnership(event) {

    this.general_analytics_settings.PREFERRED_GUARANTOR_OWNERSHIP_STATUS.push(event.target.value)

  }
  removeFromGuarantorOwnership(id) {
    if (this.general_analytics_settings.PREFERRED_GUARANTOR_OWNERSHIP_STATUS.indexOf(id) > -1) {
      this.general_analytics_settings.PREFERRED_GUARANTOR_OWNERSHIP_STATUS.splice(this.general_analytics_settings.PREFERRED_GUARANTOR_OWNERSHIP_STATUS.indexOf(id), 1)
    }
  }
  isAvailableInGuarantorOwnership(dial_code) {
    if (this.general_analytics_settings.PREFERRED_GUARANTOR_OWNERSHIP_STATUS.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }

  addToGuarantorJobSector(event) {

    this.general_analytics_settings.ALLOWABLE_GUARANTOR_JOB_SECTOR.push(event.target.value)

  }
  removeFromGuarantorJobSector(id) {
    if (this.general_analytics_settings.ALLOWABLE_GUARANTOR_JOB_SECTOR.indexOf(id) > -1) {
      this.general_analytics_settings.ALLOWABLE_GUARANTOR_JOB_SECTOR.splice(this.general_analytics_settings.ALLOWABLE_GUARANTOR_JOB_SECTOR.indexOf(id), 1)
    }
  }
  isAvailableInGuarantorJobSector(dial_code) {
    if (this.general_analytics_settings.ALLOWABLE_GUARANTOR_JOB_SECTOR.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }

  addToOutgoingTimebelt(event) {

    this.general_analytics_settings.ACCEPTED_OUTGOING_TIMEBELT.push(event.target.value)

  }
  removeFromOutgoingTimebelt(id) {
    if (this.general_analytics_settings.ACCEPTED_OUTGOING_TIMEBELT.indexOf(id) > -1) {
      this.general_analytics_settings.ACCEPTED_OUTGOING_TIMEBELT.splice(this.general_analytics_settings.ACCEPTED_OUTGOING_TIMEBELT.indexOf(id), 1)
    }
  }
  isAvailableInOutgoingTimebelt(dial_code) {
    if (this.general_analytics_settings.ACCEPTED_OUTGOING_TIMEBELT.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }

  addToIncomingTimebelt(event) {

    this.general_analytics_settings.ACCEPTED_INCOMING_TIMEBELT.push(event.target.value)

  }
  removeFromIncomingTimebelt(id) {
    if (this.general_analytics_settings.ACCEPTED_INCOMING_TIMEBELT.indexOf(id) > -1) {
      this.general_analytics_settings.ACCEPTED_INCOMING_TIMEBELT.splice(this.general_analytics_settings.ACCEPTED_INCOMING_TIMEBELT.indexOf(id), 1)
    }
  }
  isAvailableInIncomingTimebelt(dial_code) {
    if (this.general_analytics_settings.ACCEPTED_INCOMING_TIMEBELT.indexOf(dial_code) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
