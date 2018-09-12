import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { DataService, OptionsserviceService, LoansService, StorageService, CustomerService } from '../_services/index';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Loan_ } from '../_models/loan_';
import { IMyDpOptions } from 'mydatepicker';
import { IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyInputFocusBlur, IMyMarkedDate, IMyDate, IMySelector } from 'mydatepicker';
import { Loan } from '../_interfaces/loan.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { DatepickerOptions } from 'ng2-datepicker';
@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {
  editAfterAccepted = true;
  SEND_CONTRACT_DOCS = false;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public loading = false;
  public optionEditing = '';
  disdate = false;
  repdate = false;
  @Output() paymentHasBeenProcessedFinally = new EventEmitter();
  @Output() openThePaymentForFinalBreaking = new EventEmitter();
  @Input() selectedCustomer: any;
  public searchedCustomerResult: any;
  @Input() customerSelected = false;
  @Input() from = '0';
  public loan: any;
  showingMore = false;
  overlayOpen = false;
  @Input('sub') sub = '0';
  @Input('request_id') request_id: any;
  public loan_request = {
    REQUEST_ID: '',
    REQUEST_PRINCIPAL: 0,
    REQUEST_RATE: '0',
    REQUEST_TENOR: '0',
    LOAN_PRODUCT_ID: '0',
    REQUEST_RATE_PERIOD_ID: '0',
    REQUEST_PERIOD_ID: '0',
    PEOPLE_ID: '',
    LOAN_CURRENCY: '1',
    WHERE_FROM: '3',
    IS_PEER_TO_PEER: '0',
    ALLOW_MORATORIUM: '1',
    ALL_INTERESTS_UPFRONTED: '0',
    ALL_INTERESTS_HAVE_BEEN_PAID: '0',
    REPAYMENT_TYPE: '',
    DISBURSEMENT_DATE: '0',
    REPAYMENT_STARTED_WHEN: '',
    IS_ACCEPTED: '0',
    CONTRACT_DOC_SENT: '0',
    TOTAL_FEES_CHARGES: 0
  };
  // options: DatepickerOptions = {
  //   minYear: 1970,
  //   maxYear: 2030,
  //   displayFormat: 'MMM D[,] YYYY',
  //   barTitleFormat: 'MMMM YYYY',
  //   firstCalendarDay: 0,
  // };
  public installment_frequency = '1';
  public installment_frequencies = [{ value: '1', display: 'One Off' }, { value: '2', display: 'Monthly' }];
  public fees: any;
  public charges: any;
  public loan_products: any;
  public loanofficers: any[];
  public currentUser: any;
  public searchForCustomer = false;
  public loan_purpose = [{ value: '1', display: 'Retail' }, { value: '2', display: 'Commercial' }, { value: '9', display: 'CP' },
  { value: '10', display: 'Lease' }, { value: '11', display: 'Staff' }];
  public loan_purposes: any;
  public loan_currency = "NGN";
  public loan_duration = "Months";
  public interest_duration = "Per Month";
  public countries: any;
  public loan_product: any;
  public changingProduct = false;
  public interestOpen = '1';
  public otherClosed = true;
  public interestAlone = false;
  public epi = false;
  public bullet = false;
  public allowMoratorium = false;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    height: '34px',
    width: '210px',
    dateFormat: 'yyyy-mm-dd',
    openSelectorTopOfInput: false,
  };
  public selDate: IMyDate = { year: 0, month: 0, day: 0 };
  public selDate_: IMyDate = { year: 0, month: 0, day: 0 };
  public rtypes = [{ value: 1, display: 'Equal Monthly Installment' }, { value: 2, display: 'Interest Alone' }, { value: 6, display: 'Reducing Balance' }];
  public oneoff_types = [{ value: 3, display: 'Bullet' }];
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": '1', "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": '2', "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": '3', "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": '4', "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
    ;
  public request_step = '1';
  allfeesqueue: any;
  allchargesqueue: any;
  paidfeesandcharges: any;
  constructor(private toastr: ToastrService, vcr: ViewContainerRef, private DataService: DataService, public router: Router,
    public _fb: FormBuilder, public storageService: StorageService,
    public customerService: CustomerService,
    public optionsService: OptionsserviceService, public loansService: LoansService) {
    this.optionsService.getCountries().subscribe(countries => this.countries = countries);
    this.currentUser = this.storageService.read<any>('currentUser');
    this.DataService.onGetCustomer.subscribe(res => {

    })
    if (this.sub == '2' || this.sub == '5' || this.sub == '8') {
      this.loan_request.PEOPLE_ID = this.selectedCustomer.PEOPLE_ID;
    }
  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }
  showError(msg) {
    this.toastr.error(msg);
  }
  public searchString = "";
  ngOnInit() {
    this.newloan()
  }

  newloan() {

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
      REPAYMENT_TYPE_ID: [''],
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
      INSTALLMENT_FREQUENCY: [''],
      FEE_TYPE: [''],
      TOTAL_FLAT_FEES: [''],
      TOTAL_PERCENTAGE_FEES: [''],
      LOAN_PURPOSE_ID: [''],
      DESCRIPTION: ['']
    });

    if (this.sub == '1' || this.sub == '5' || this.sub == '8') {

      this.customerSelected = true;

      this.request_step = '2';
      this.loansService.getLoan(this.currentUser.token, this.request_id)
        .subscribe(loan => {


          this.loan_request = loan;
          if (loan.CONTRACT_DOC_SENT == '1' || loan.IS_ACCEPTED == '1') {
            this.editAfterAccepted = false;
          }
          this.selectedCustomer = loan;
          this.loan_request.REQUEST_RATE = loan.REQUEST_RATE
          if (loan.REPAYMENT_TYPE_ID === '3') {
            this.installment_frequency = this.installment_frequencies[0].value;
            (<FormControl>this.myForm.controls['REPAYMENT_TYPE_ID'])
              .setValue(loan.REPAYMENT_TYPE_ID, { onlySelf: true });
          } else {
            this.installment_frequency = this.installment_frequencies[1].value;
            (<FormControl>this.myForm.controls['REPAYMENT_TYPE_ID'])
              .setValue(loan.REPAYMENT_TYPE_ID, { onlySelf: true });
          }
          (<FormControl>this.myForm.controls['LOAN_PURPOSE_ID'])
            .setValue(loan.LOAN_PURPOSE_ID, { onlySelf: true });
          (<FormControl>this.myForm.controls['DESCRIPTION'])
            .setValue(loan.DESCRIPTION, { onlySelf: true });
        });
      this.loansService.getLoan_(this.currentUser.token, this.request_id)
        .subscribe(loan => {

          this.loan = loan;

          if (loan.REQUEST_RATE_PERIOD_ID === '1') {

            this.interest_duration = "Per Day";
          }
          if (loan.REQUEST_RATE_PERIOD_ID === '2') {

            this.interest_duration = "Per Month";
          }
          if (loan.REQUEST_RATE_PERIOD_ID === '3') {

            this.interest_duration = "Per Year";
          }
          if (loan.REQUEST_PERIOD_ID === '1') {

            this.loan_duration = "Days";
          }
          if (loan.REQUEST_PERIOD_ID === '2') {

            this.loan_duration = "Months";
          }
          if (loan.REQUEST_PERIOD_ID === '3') {

            this.loan_duration = "Years";
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

      this.loansService.getLoanFeesAndCharges(this.currentUser.token, this.request_id)
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
    else {

    }
    this.loansService.getLoanProducts(this.currentUser.token, 0).subscribe(loan_products => {
      this.SEND_CONTRACT_DOCS = loan_products.people.SEND_CONTRACT_DOCS == '1' ? true : false;
      this.loan_products = loan_products.products;
      this.loan_product = loan_products.default;
      this.loan_purposes = loan_products.purposes;

      if (this.sub == '1' || this.sub == '5' || this.sub == '8') {


      }
      else {

        this.loan_request.LOAN_PRODUCT_ID = this.loan_product.LOAN_PRODUCT_ID
        this.loan_request.REQUEST_RATE = this.loan_product.LOAN_INTEREST
        this.loan_request.REQUEST_RATE_PERIOD_ID = this.loan_product.LOAN_INTEREST_TYPE
        this.loan_request.REQUEST_PERIOD_ID = this.loan_product.LOAN_DURATION_TYPE
        if (this.loan_product.LOAN_INTEREST_TYPE === '1') {

          this.interest_duration = "Per Day";
        }
        if (this.loan_product.LOAN_INTEREST_TYPE == '2') {

          this.interest_duration = "Per Month";
        }
        if (this.loan_product.LOAN_INTEREST_TYPE == '3') {
          this.interest_duration = "Per Year";
        }
        if (this.loan_product.LOAN_INTEREST_TYPE == '4') {
          this.interest_duration = "Per Week";

        }
        if (this.loan_product.LOAN_DURATION_TYPE == '1') {
          this.loan_duration = "Days";
        }
        if (this.loan_product.LOAN_DURATION_TYPE == '2') {
          this.loan_duration = "Months";
        }
        if (this.loan_product.LOAN_DURATION_TYPE == '3') {
          this.loan_duration = "Years";
        }
        if (this.loan_product.LOAN_DURATION_TYPE == '4') {
          this.loan_duration = "Weeks";

        }
      }

    });
  }
  changeInstallmentFrequency(event) {

    this.installment_frequency = event;

    this.allowMoratorium = false;
    this.loan_request.ALLOW_MORATORIUM = '1';
    (<FormControl>this.myForm.controls['ALLOW_MORATORIUM'])
      .setValue(1, { onlySelf: true });
    if (this.installment_frequency === '1') {
      this.rtypes = [{ value: 3, display: 'Bullet' }];
      (<FormControl>this.myForm.controls['REPAYMENT_TYPE_ID'])
        .setValue('3', { onlySelf: true });
      this.loan_request.REPAYMENT_TYPE = "Bullet";
    } else {
      this.rtypes = [{ value: 1, display: 'Equal Monthly Installment' }, { value: 2, display: 'Interest Alone' }, { value: 6, display: 'Reducing Balance' }];
      // if(this.myForm.controls['INTEREST_RATE_TYPE_ID'].value=='1'){
      //   this.rtypes = [{ value: 1, display: 'Equal Monthly Installment' }];

      // }
      (<FormControl>this.myForm.controls['REPAYMENT_TYPE_ID'])
        .setValue('1', { onlySelf: true });
      this.loan_request.REPAYMENT_TYPE = "EPI";
    }

  }
  sendToMarket() {

    this.loading = true;
    this.loansService.sendToLoanMarket(this.currentUser.token, parseInt(this.loan_request.REQUEST_ID), false)
      .subscribe(loan => {

        this.loading = false;
        this.request_step = '3'
      });
  }
  paymentProcessDone() {
    this.paymentHasBeenProcessedFinally.emit(this.sub);
  }
  createContract(model: Loan, isValid: boolean) {
    this.submitted = true; // set form submit to true
    this.loading = true;

    this.loansService.save_contract(this.currentUser.token, this.myForm.value, this.allfeesqueue, this.allchargesqueue, this.fees, this.charges, this.paidfeesandcharges, this.loan_request, this.SEND_CONTRACT_DOCS)
      .subscribe(res => {

        if (this.sub != '5' && this.sub != '8') {
          this.loading = false;

          this.request_step = '3';
          this.DataService.refreshPage.emit();
        } else {
          if (this.sub == '8') {
            this.loansService.finishTopUp(this.currentUser.token, this.loan_request.REQUEST_ID)
              .subscribe(resd => {

                this.loading = false;
                if (resd.status == '1') {
                  this.openThePaymentForFinalBreaking.emit(resd)

                }
              });

          } else {
            this.loansService.finishRollover(this.currentUser.token, this.loan_request.REQUEST_ID)
              .subscribe(resd => {

                this.loading = false;
                if (resd.status == '1') {
                  this.request_step = 'finishedRollover';

                }
              });

          }

        }

      });
  }
  onDateChanged(event: IMyDateModel) {
    this.submitted = true;
    let data = {
      "DISBURSEMENT_DATE": event.formatted,
      "REQUEST_PERIOD_ID": this.myForm.controls.REQUEST_PERIOD_ID.value,
      "MONTHLY_PERIOD": this.myForm.controls.MONTHLY_PERIOD.value,
      "DAYS_PER_YEAR": this.myForm.controls.DAYS_PER_YEAR.value,
    }
    this.loansService.modify_repay_date(data)
      .subscribe(loan => {
        let d_: Date = new Date(loan.repay);

        this.selDate_ = {
          year: d_.getFullYear(),
          month: d_.getMonth() + 1,
          day: d_.getDate()
        };

        let d: Date = new Date(loan.disburse);

        this.selDate = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        };
        this.loan_request.DISBURSEMENT_DATE = loan.disburse;
        this.loan_request.REPAYMENT_STARTED_WHEN = loan.repay;
        (<FormControl>this.myForm.controls['REPAYMENT_STARTED_WHEN'])
          .setValue(loan.repay, { onlySelf: true });
      });
  }
  getNet(loan_request) {
    let total = parseInt(loan_request.REQUEST_PRINCIPAL);
    if (loan_request.FEE_TYPE === '0') {
      total -= parseInt(loan_request.TOTAL_FEES_CHARGES)
    }
    return total;
  }
  previewLoan() {
    this.loading = true;
    this.loansService.previewLoan(this.currentUser.token, this.loan_request, this.selectedCustomer, this.loan_product).subscribe(loan_request => {
      this.loading = false;
      if (loan_request.status === false) {
        this.showError("Customer has an active request");
      } else {
        this.loan_request = loan_request
        this.request_step = '2'

        this.loansService.getLoan_(this.currentUser.token, loan_request.REQUEST_ID)
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

        this.loansService.getLoanFeesAndCharges(this.currentUser.token, loan_request.REQUEST_ID)
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


    });
  }
  view_loan(request_id) {
    this.router.navigate(['/loan', request_id]);
    this.DataService.onViewLoan.emit({ request_id: request_id, from: this.from });

  }
  selectCustomer(customer) {
    this.selectedCustomer = customer;
    this.customerSelected = true;
    this.searchForCustomer = false;
    this.loan_request.PEOPLE_ID = customer.PEOPLE_CUSTOMERS_ID;
  }
  searchCustomers() {
    if (this.searchString == "") {
      this.searchedCustomerResult = {}
    } else {
      this.customerService.searchForCustomers(this.currentUser.token, this.searchString, '')
        .subscribe(customers => {
          this.searchedCustomerResult = customers
        });
    }

  }

  changeCurrency(c) {
    this.loan_currency = c.currency[0];
    (<FormControl>this.myForm.controls['REQUEST_CURRENCY_ID'])
      .setValue(this.loan_currency, { onlySelf: true });
  }


  changeDuration(d, T) {
    if (T === 1) {
      this.loan_duration = this.loan_durations[d]["LOAN_DURATION"];
      this.loan_request.REQUEST_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
      (<FormControl>this.myForm.controls['REQUEST_PERIOD_ID'])
        .setValue(d.LOAN_INTEREST_DURATION_ID, { onlySelf: true });
    }
    if (T === 2) {

      this.interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.loan_request.REQUEST_RATE_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

      (<FormControl>this.myForm.controls['REQUEST_RATE_PERIOD_ID'])
        .setValue(d.LOAN_INTEREST_DURATION_ID, { onlySelf: true });

    }

  }
  changeRepay(event) {
    this.allowMoratorium = false;
    this.loan_request.ALLOW_MORATORIUM = '1';
    (<FormControl>this.myForm.controls['ALLOW_MORATORIUM'])
      .setValue(1, { onlySelf: true });
    if (event == "1") {
      this.rtypes = [{ value: 1, display: 'Equal Monthly Installment' }];
    }
    if (event == "2") {
      this.rtypes = [{ value: 1, display: 'Equal Monthly Installment' }, { value: 2, display: 'Interest Alone' }, { value: 6, display: 'Reducing Balance' }];
    }
  }

  cIA(event) {

    this.interestAlone = false;
    this.epi = false;
    this.bullet = false;
    this.allowMoratorium = false;
    this.loan_request.ALLOW_MORATORIUM = '1';
    (<FormControl>this.myForm.controls['ALLOW_MORATORIUM'])
      .setValue(1, { onlySelf: true });
    if (event == "2") {
      this.interestAlone = true;
      this.epi = false;
      this.loan_request.REPAYMENT_TYPE = "Interest Alone";
      (<FormControl>this.myForm.controls['INTEREST_RATE_TYPE_ID'])
        .setValue('2', { onlySelf: true });
    }
    if (event == "1") {
      this.epi = true;
      this.loan_request.REPAYMENT_TYPE = "EPI";
    }
    if (event == "3") {
      this.bullet = true;
    }
    if (event == "6") {
      (<FormControl>this.myForm.controls['INTEREST_RATE_TYPE_ID'])
        .setValue('2', { onlySelf: true });
      this.loan_request.REPAYMENT_TYPE = "Reducing Balance";
    }
  }
  cIB(event) {

    this.allowMoratorium = false;

    if (event == "2") {
      this.allowMoratorium = true;
    }
  }
  new_request() {
    this.request_step = '1';
    this.selectedCustomer = [];
    this.searchedCustomerResult = [];
    this.customerSelected = false;
    this.searchForCustomer = true;
    this.loading = false;
    this.sub = '0';
    this.newloan();
    this.loan_request.REQUEST_ID = '0';
  }
  save(value, valid) {

  }
  viewingSchedule = false;
  view_schedule() {
    this.viewingSchedule = true;
  }
  closePopUp() {
    this.viewingSchedule = false;
  }
  modifyContract() {
    this.viewingSchedule = false;
  }
  recalculateFees() {
    this.loansService.recalculateFees(this.currentUser.token, this.myForm.value)
        .subscribe(data => {
          this.loan_request.TOTAL_FEES_CHARGES = data.TOTAL_FEES_CHARGES
        });
  }
}
