import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OperationsService, StorageService, LoansService, DecisionService,AuthenticationService } from '../../_services/index';
import { OptionsserviceService } from '../../_services/optionsservice.service';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { LevelModel } from '../../_models/level.model';

@Component({
  selector: 'app-guarantor',
  templateUrl: './guarantor.component.html',
  styleUrls: ['./guarantor.component.css']
})
export class GuarantorComponent implements OnInit {

  subview = 'guarantor';

  currentUser: any;
  required_documents_guarantors:any;
  guarantors:any;

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

  public vr = {
    bvnmustmatch: false,
    cardmustmatch: false,
    accountmustmatch: false,
  };

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

  public loandefault = {
    LOAN_DEFAULT_DURATION: '0',
    AUTOROLLOVER: false,
    ROLLOVERDURATION: '0',
    ROLLOVERFEESPERCENT: '0',
    ROLLOVERFEESFLAT: '0',
    LOAN_LATE_DURATION: '0',
    LOAN_DELIQUENT_DURATION: '0'
  };

  generalnotifications = {
    DUEREPAYMENT: '',
    DIRECTDEBIT: '',
    ADDING_CARDS: false,
    DOCUMENT_UPLOAD: '',
    GENERAL_NOTIFICATION_EMAIL: false,
    TERMS_AND_CONDITIONS: ''
  }

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

  gateway = {
    "CHOOSE_PAYMENT_PROCESSOR": false,
    "ACTIVE_PAYMENT_GATEWAY": "1",
    "ALLOWED_CARD_TYPES": []
  }

  public floor_rate = {
    ENABLE_FLOOR_INTEREST_RATE: false,
    FLOOR_INTEREST_RATE: '0',
    INCREMENT_AFTER_FLOOR: false,
    FLOOR_INCREMENTAL_VALUE: 0,
    MAX_FLOOR_DURATION: '1',
  };

  guarantor_requirements = {
    guarantor_requirements: [],
    SEND_GUARANTOR_INVITES: false,
    GUARANTOR_TERMS_AND_CONDITIONS:''
  }

  public fee_settings = {
    FEE_TYPE: '0',
    FEE_PERCENT_VALUE: '0',
    FEE_FLAT_VALUE: '0',
    FEES_ACCOUNT: '0',
    CARD_REQUEST_FEE: '0'
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

  public fines_settings = {
    ENABLE_FINES: false,
    FINES_PERCENT_VALUE: '0',
    FINES_FLAT_VALUE: '0',
    FINES_ACCOUNT: '0'
  };

  public payment = {
    ALLOW_AUTO_APPROVE_PAYMENT: false,
    AUTO_APPROVE_PAYMENT_AMOUNT: '0',
    SEND_PAYMENTS_TO_QUEUE: false,
    ALLOW_PART_PAYMENT: false
  };
  sectors: any;
  occupations: any;
  states: any;
  lgas: any;

  marital_statuses = [
    { value: '1', display: 'Single' },
    { value: '2', display: 'Married' },
    { value: '3', display: 'Divorced' },
    { value: '4', display: 'Widowed' }
  ];

  // public guarantors = [
  //   { value: '1', display: 'Phone' },
  //   { value: '2', display: 'Home Address' },
  //   { value: '3', display: 'Work Information' },
  //   { value: '4', display: 'Bank Account' },
  //   { value: '5', display: 'Repayment Card' }, 
  //   { value: '6', display: 'Social' },
  // ];

  @Output() saveFpayorm = new EventEmitter();
  @Input('special_interest_duration') special_interest_duration: any;
  @Input('loan_durations') loan_durations: any;
  @Input('loading') loading: any;



  constructor(public authService:AuthenticationService,
    public toastr: ToastrService,
    public loansService: LoansService,
    public optionsService: OptionsserviceService,
    public storageService: StorageService,
    public operationsService: OperationsService,
    public decisionService: DecisionService) {
    this.currentUser = this.storageService.read<any>('currentUser');
   }

   showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  saveSpecialLoanInterest(value, valid) {

    this.loading = true;
    this.operationsService.saveLoanProduct(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message);
        } else {
          this.showError(data.message);
        }
      });
  }
  ngOnInit() {
    this.operationsService.getAppSettings(this.currentUser.token)
      .subscribe(data => {
        console.log(data);
        this.floor_rate.ENABLE_FLOOR_INTEREST_RATE = data.product.ENABLE_FLOOR_INTEREST_RATE;
        this.floor_rate.MAX_FLOOR_DURATION = data.product.MAX_FLOOR_DURATION;
        this.floor_rate.FLOOR_INTEREST_RATE = data.product.FLOOR_INTEREST_RATE;
        this.floor_rate.INCREMENT_AFTER_FLOOR = data.product.INCREMENT_AFTER_FLOOR;
        this.floor_rate.FLOOR_INCREMENTAL_VALUE = data.product.FLOOR_INCREMENTAL_VALUE;
      });

      this.loansService.getLoanProducts(this.currentUser.token, 0).subscribe(loan_products => {
        this.product = loan_products.default;
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
        
        
        this.guarantor_requirements.guarantor_requirements = data.product.GUARANTOR_REQUIREMENTS;
        this.guarantor_requirements.SEND_GUARANTOR_INVITES = data.product.SEND_GUARANTOR_INVITES;
        this.guarantor_requirements.GUARANTOR_TERMS_AND_CONDITIONS = data.product.GUARANTOR_TERMS_AND_CONDITIONS;

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


        this.geo_settings.LGAS = data.product.ALLOWED_LGAS;
        this.geo_settings.LGS = data.product.LGA_IDS;
        this.geo_settings.ENABLE_GEOFENCING = data.product.ENABLE_GEOFENCING;
        this.geo_settings.ADDRESS_TO_USE = data.product.ADDRESS_TO_USE;
        this.geo_settings.GEOFENCE_DISTANCE = data.product.GEOFENCE_DISTANCE;
        this.geo_settings.ADDRESSTYPES = data.product.ADDRESS_TYPES;
      });
  }

  changeDuration(d, T) {

    if (T === 3) {
      this.special_interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.product.LOAN_INTEREST_ON_AMOUNT_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
    }

  }

  isGuarantorRequirementAvailable(OCCUPATION_ID, index) {

    if (this.guarantor_requirements.guarantor_requirements.indexOf(OCCUPATION_ID) > -1) {
      this.guarantors[index]['checked'] = true;
      return true;
    } else {
      return false;
    }
  }

  saveGuarantorRequirements(value, valid) {
    this.loading = true;
    this.operationsService.
    saveGuarantorRequirements(this.currentUser.token, value, this.sectors,
       this.occupations, this.marital_statuses, this.states, 
       this.guarantors, this.guarantor_requirements, 
       this.required_documents_guarantors)
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
