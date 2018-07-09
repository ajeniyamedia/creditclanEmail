import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService, StorageService, LoansService, DecisionService } from '../../_services/index';
import { OptionsserviceService } from '../../_services/optionsservice.service';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { LevelModel } from '../../_models/level.model';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';

@Component({
  selector: 'app-simpledecision',
  templateUrl: './simpledecision.component.html',
  styleUrls: ['./simpledecision.component.css']
})
export class SimpledecisionComponent implements OnInit {

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
  public qualified_borrowers = {
    MIN_SALARY_ACCEPTABLE: '0',
    LOAN_PRODUCT_ID: '0',
    MIN_AGE: '0',
    MAX_AGE: '0',
    ALLOWED_MARITAL_STATUS: [],
    ALLOWED_ADDRESS_STATES: []
  }
  public backend = {
    SUSPEND_IF_FAIL_ELIGIBILITY: false,
    SUSPEND_FOR_HOW_LONG: 24,
    enableautorouting: true,
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
    ENABLE_BULK_DISBURSEMENT: false
  };
  loading = false;
  states: any;
  marital_statuses = [
    { value: '1', display: 'Single' },
    { value: '2', display: 'Married' },
    { value: '3', display: 'Divorced' },
    { value: '4', display: 'Widowed' }
  ];
  sectors: any;
  occupations: any;
  currentUser: any;
  guarantors = [
    { value: '1', display: 'Phone' },
    { value: '2', display: 'Home Address' },
    { value: '3', display: 'Work Information' },
    { value: '4', display: 'Bank Account' },
    { value: '5', display: 'Repayment Card' },
    { value: '6', display: 'Social' }
  ];
  constructor(public toastr: ToastrService, vcr: ViewContainerRef,
    public loansService: LoansService, public optionsService: OptionsserviceService,
    private router: Router, public storageService: StorageService,
    public operationsService: OperationsService,
    public decisionService: DecisionService) {
    this.currentUser = this.storageService.read<any>('currentUser');


  }
  guarantor_requirements = {
    guarantor_requirements: [],
    SEND_GUARANTOR_INVITES: false
  }
  enable_peer = '0';
  job_sectors: any;
  countries: any;
  job_grades: any;
  ngOnInit() {
    this.optionsService.getOccupation(2).subscribe(sectors => this.sectors = sectors);
    this.optionsService.getOccupation(1).subscribe(sectors => this.occupations = sectors);
    this.optionsService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.loansService.getLoanProducts(this.currentUser.token, 0).subscribe(loan_products => {
      this.product = loan_products.default;
    });

    this.operationsService.getJobDetails(this.currentUser.token).subscribe(data => {
      this.job_grades = data;
    });

    this.operationsService.getJobSector(this.currentUser.token).subscribe(data => {
      this.job_sectors = data;
    });
    this.operationsService.getAppSettings(this.currentUser.token)
      .subscribe(data => {

        this.backend.SUSPEND_FOR_HOW_LONG = data.backend.SUSPEND_FOR_HOW_LONG;
        this.backend.ENABLE_BULK_DISBURSEMENT = data.backend.ENABLE_BULK_DISBURSEMENT;
        this.backend.SUSPEND_IF_FAIL_ELIGIBILITY = data.backend.SUSPEND_IF_FAIL_ELIGIBILITY;
        this.backend.enableautorouting = data.backend.enableautorouting;
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

        this.qualified_borrowers.MIN_SALARY_ACCEPTABLE = data.product.MIN_SALARY_ACCEPTABLE;
        this.qualified_borrowers.LOAN_PRODUCT_ID = data.product.LOAN_PRODUCT_ID;
        this.qualified_borrowers.MIN_AGE = data.product.MIN_AGE;
        this.qualified_borrowers.MAX_AGE = data.product.MAX_AGE;
        this.qualified_borrowers.ALLOWED_MARITAL_STATUS = data.product.ALLOWED_MARITAL_STATUS;
        this.qualified_borrowers.ALLOWED_ADDRESS_STATES = data.product.ALLOWED_ADDRESS_STATES;

        this.guarantor_requirements.guarantor_requirements = data.product.GUARANTOR_REQUIREMENTS;
        this.guarantor_requirements.SEND_GUARANTOR_INVITES = data.product.SEND_GUARANTOR_INVITES;

        this.states = data.states;
      });
  }
  saveQualifiedBorrowers(value, valid) {

    this.loading = true;
    this.operationsService.saveQualifiedBorrowers(this.currentUser.token, value, this.sectors, this.occupations,
      this.marital_statuses, this.states, this.guarantors, this.guarantor_requirements)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
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
  isAvailable(OCCUPATION_ID, sectors, index) {

    if (sectors == 'sector') {
      if (this.product.PREFERRED_OCCUPATION_SECTOR.indexOf(OCCUPATION_ID) > -1) {
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
  checkMaritalStatus(sector, event, index) {
    this.marital_statuses[index]["checked_"] = event;

  }
  checkSector(sector, event, index) {
    this.sectors[index]["checked_"] = event;
  }
  checkAllowedState(sector, event, index) {
    this.states[index]["checked_"] = event;

  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  isStateAvailable(OCCUPATION_ID, index) {
    if (this.qualified_borrowers.ALLOWED_ADDRESS_STATES.indexOf(OCCUPATION_ID) > -1) {
      this.states[index]["checked"] = true;
      return true;
    } else {
      return false;
    }
  }
  checkOccupation(sector, event, index) {
    this.occupations[index]["checked_"] = event;

  }
}
