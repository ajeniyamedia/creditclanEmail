import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../_services/index';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';
import { IMyDpOptions } from 'mydatepicker';
import { DataService } from "../_services/data.service";
import { IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyInputFocusBlur, IMyMarkedDate, IMyDate, IMySelector } from 'mydatepicker';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
@Component({
  selector: 'app-loancontractform',
  templateUrl: './loancontractform.component.html',
  styleUrls: ['./loancontractform.component.css']
})
export class LoancontractformComponent implements OnInit {

  @Input('master') masterName: string;
  @Input('editing_customer') editing_customer: string;
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  public ACD: number = 0;
  public loading = false;
  public model = { LOAN_PURPOSE_CHANGE: 0, LOAN_PRODUCT_ID_CHANGE: 0, REQUEST_ID: '' };
  public loan_products: any[];
  public loanofficers: any[];
  public currentUser: any;
  public loan_purpose = [{ value: '1', display: 'Retail' }, { value: '2', display: 'Commercial' }, { value: '9', display: 'CP' },
  { value: '10', display: 'Lease' }, { value: '11', display: 'Staff' }];
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public loan: Loan_;
  public loan_currency = "NGN";
  public loan_duration = "Months";
  public interest_duration = "Per Month";
  public countries: any[];
  public rtypes = [{ value: 1, display: 'EPI' }, { value: 2, display: 'Interest Alone' }, { value: 3, display: 'Bullet' },
  { value: 6, display: 'Reducing Balance' }];
  public interestOpen = '1';
  public otherClosed = true;
  public interestAlone = false;
  public epi = false;
  public bullet = false;
  public allowMoratorium = false;
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": 1, "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": 2, "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": 3, "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": 4, "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
  ;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    height: '34px',
    width: '210px',
    dateFormat: 'yyyy-mm-dd',
    openSelectorTopOfInput: false,
  };
  public selDate: IMyDate = { year: 0, month: 0, day: 0 };
  public selDate_: IMyDate = { year: 0, month: 0, day: 0 };
  allfeesqueue: any;
  allchargesqueue: any;
  fees: any;
  charges: any;
  paidfeesandcharges: any;
  constructor(private DataService: DataService, public _fb: FormBuilder, public storageService: StorageService,
     public optionsService: OptionsserviceService, public loansService: LoansService) {
    this.optionsService.getCountries().subscribe(countries => this.countries = countries);

  }
  onDateChanged(event: IMyDateModel) {
    this.submitted = true;
    let data = {
      "DISBURSEMENT_DATE": event.formatted,
      "REQUEST_PERIOD_ID": this.myForm.controls.REQUEST_PERIOD_ID.value,
      "MONTHLY_PERIOD": this.myForm.controls.MONTHLY_PERIOD.value,
      "DAYS_PER_YEAR": this.myForm.controls.DAYS_PER_YEAR.value,
    }

  }

  closeSec(sec) {
    this.otherClosed = true;
    this.interestOpen = '0';
  }
  openSec(sec) {
    this.otherClosed = true;
    this.interestOpen = sec;
  }
  calculateSecurityDeposit(type) {
    if (type === 1) {
      let pt = this.myForm.controls.SECURITY_DEPOSIT.value;
      if (pt == "" || pt == "0") {
        (<FormControl>this.myForm.controls['TOTAL_SECURITY_DEPOSIT'])
          .setValue(0, { onlySelf: true });
      } else {
        let amt = (pt / 100) * this.myForm.controls.REQUEST_PRINCIPAL.value;
        (<FormControl>this.myForm.controls['TOTAL_SECURITY_DEPOSIT'])
          .setValue(amt, { onlySelf: true });
      }
    }
    if (type === 2) {
      let pt = this.myForm.controls.TOTAL_SECURITY_DEPOSIT.value;

      if (pt == "" || pt == "0") {
        (<FormControl>this.myForm.controls['SECURITY_DEPOSIT'])
          .setValue(0, { onlySelf: true });
      } else {
        var amt = (pt / this.myForm.controls.REQUEST_PRINCIPAL.value) * 100;
        (<FormControl>this.myForm.controls['SECURITY_DEPOSIT'])
          .setValue(amt, { onlySelf: true });
      }
    }
  }
  changeRepay(event) {
    this.allowMoratorium = false;
    (<FormControl>this.myForm.controls['ALLOW_MORATORIUM'])
      .setValue(1, { onlySelf: true });
    if (event == "1") {
      this.rtypes = [{ value: 1, display: 'EPI' }, { value: 3, display: 'Bullet' }];
    }
    if (event == "2") {
      this.rtypes = [{ value: 1, display: 'EPI' }, { value: 2, display: 'Interest Alone' }, { value: 3, display: 'Bullet' },
      { value: 6, display: 'Reducing Balance' }];
    }
  }

  cIA(event) {

    this.interestAlone = false;
    this.epi = false;
    this.bullet = false;
    this.allowMoratorium = false;
    (<FormControl>this.myForm.controls['ALLOW_MORATORIUM'])
      .setValue(1, { onlySelf: true });
    if (event == "2") {
      this.interestAlone = true;
      this.epi = false;
    }
    if (event == "1") {
      this.epi = true;
    }
    if (event == "3") {
      this.bullet = true;
    }
  }
  cIB(event) {

    this.allowMoratorium = false;

    if (event == "2") {
      this.allowMoratorium = true;
    }
  }
  changeCurrency(c) {
    this.loan_currency = c.currency[0];
    (<FormControl>this.myForm.controls['REQUEST_CURRENCY_ID'])
      .setValue(this.loan_currency, { onlySelf: true });
  }
  changeDuration(d, T) {
    if (T === 1) {
      this.loan_duration = d.LOAN_DURATION;
      (<FormControl>this.myForm.controls['REQUEST_PERIOD_ID'])
        .setValue(d.LOAN_INTEREST_DURATION_ID, { onlySelf: true });
    }
    if (T === 2) {
      this.interest_duration = d.INTEREST_DURATION;
      (<FormControl>this.myForm.controls['REQUEST_RATE_PERIOD_ID'])
        .setValue(d.LOAN_INTEREST_DURATION_ID, { onlySelf: true });
    }

  }

  ngOnInit() {

    this.currentUser = this.storageService.read<any>('currentUser');
    this.loansService.getLoanProducts(this.currentUser.token, 0).subscribe(loan_products => this.loan_products = loan_products);
    this.optionsService.getLoanOfficers(this.currentUser.token).subscribe(loanofficers => this.loanofficers = loanofficers);
    this.myForm = this._fb.group({
      REQUEST_ID: ['', <any>Validators.required],
      REQUEST_CURRENCY_ID: ['', <any>Validators.required],
      REQUEST_PRINCIPAL: ['', <any>Validators.required],
      REQUEST_RATE: ['', <any>Validators.required],
      REQUEST_TENOR: ['', <any>Validators.required],
      REQUEST_RATE_PERIOD_ID: ['', <any>Validators.required],
      REQUEST_PERIOD_ID: ['', <any>Validators.required],
      TYPE_OF_CREDIT: ['', <any>Validators.required],
      INTEREST_RATE_TYPE_ID: ['', <any>Validators.required],
      REPAYMENT_TYPE_ID: ['', <any>Validators.required],
      ALL_INTERESTS_UPFRONTED: [''],
      ALL_INTERESTS_HAVE_BEEN_PAID: [''],
      FEES_EXCLUDE_INCLUDE: [''],
      FEES_UPFRONT_BACKEND: [''],
      WHAT_HAPPENS_TO_INTEREST: [''],
      WHAT_HAPPENS_TO_PRINCIPAL: [''],
      ALLOW_MORATORIUM: [''],
      MORATORIUM_TYPE: [''],
      MORATORIUM_PERIOD: [''],
      DAYS_PER_YEAR: [''],
      RP_SET_TYPE: [''],
      PAID_SECURITY_DEPOSIT: [''],
      SECURITY_DEPOSIT_DEDUCTIBLE: [{ disabled: true }],
      SECURITY_DEPOSIT: [''],
      TOTAL_SECURITY_DEPOSIT: [''],
      DISBURSEMENT_DATE: ['', <any>Validators.required],
      LOAN_OFFICER: [''],
      REPAYMENT_STARTED_WHEN: [''],
      REPAYMENT_SOURCE: [''],
      MONTHLY_PERIOD: [''],
      PERIODIC_FEES_DISCOUNTED: [''],
      ALL_FEES_AND_CHARGES_PAID: [''],
      LOAN_STATUS: [''],
      IS_PEER_TO_PEER: [''],
      IS_REJECTED: [''],
      ADDED_TO_PAYMENT_QUEUE: [''],
      DO_NOT_COMPOUND: [''],
    });
    this.loansService.getLoan_(this.currentUser.token, this.masterName)
      .subscribe(loan => {

        this.loan = loan;
        if (this.loan.REQUEST_RATE_PERIOD_ID == 1) {
          this.interest_duration = "Per Day"
        }
        if (this.loan.REQUEST_RATE_PERIOD_ID == 2) {

          this.interest_duration = "Per Month"
        }
        if (this.loan.REQUEST_RATE_PERIOD_ID == 3) {
          this.interest_duration = "Per Year"
        }
        if (this.loan.REQUEST_RATE_PERIOD_ID == 4) {
          this.interest_duration = "Per Week"

        }
        if (loan.REQUEST_PERIOD_ID == 1) {
          this.loan_duration = "Days"
        }
        if (loan.REQUEST_PERIOD_ID == 2) {
          this.loan_duration = "Months"
        }
        if (loan.REQUEST_PERIOD_ID == 3) {
          this.loan_duration = "Years"
        }
        if (loan.REQUEST_PERIOD_ID == 4) {
          this.loan_duration = "Weeks"

        }
        (<FormGroup>this.myForm)
          .setValue(loan, { onlySelf: true });
        let d: Date = new Date(this.loan.DISBURSEMENT_DATE);

        this.selDate = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        };
        let d_: Date = new Date(this.loan.REPAYMENT_STARTED_WHEN);

        this.selDate_ = {
          year: d_.getFullYear(),
          month: d_.getMonth() + 1,
          day: d_.getDate()
        };
      });

    this.subcribeToFormChanges();
    this.loansService.getLoanFeesAndCharges(this.currentUser.token, this.masterName)
      .subscribe(loan => {

        if (loan.ALL_FEES_AND_CHARGES_PAID != "1") {
          this.paidfeesandcharges = loan.FEES_QUEUE.total_charges + loan.FEES_QUEUE.vat_on_fees
            + loan.CHARGES_QUEUE.total_charges + loan.CHARGES_QUEUE.vat_on_charges + Number(loan.UPFRONTED_FEES);
        } else {
          this.paidfeesandcharges = loan.PAID_FEES_AND_CHARGES;
        }

        this.fees = loan.FEES_QUEUE.charges;
        this.charges = loan.CHARGES_QUEUE.charges;
        this.allfeesqueue = loan.FEES_QUEUE;
        this.allchargesqueue = loan.CHARGES_QUEUE;

      });

  }
  subcribeToFormChanges() {
    const myFormStatusChanges$ = this.myForm.statusChanges;
    const myFormValueChanges$ = this.myForm.valueChanges;

    myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
    myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));

  }
  save_contract(model: Loan, isValid: boolean) {
    console.log(this.allfeesqueue)
    this.submitted = true; // set form submit to true
    this.loading = true;
    this.loansService.save_contract(this.currentUser.token, this.myForm.value, this.allfeesqueue, this.
      allchargesqueue, this.fees, this.charges, this.paidfeesandcharges,null,null)
      .subscribe(loan => {
        this.loading = false;

      });
  }
  save(a, b) {

  }
}
