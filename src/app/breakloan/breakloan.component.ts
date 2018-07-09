import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index'; 
import { IMyDpOptions } from 'mydatepicker';
import { IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyInputFocusBlur, IMyMarkedDate, IMyDate, IMySelector } from 'mydatepicker'; 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-breakloan',
  templateUrl: './breakloan.component.html',
  styleUrls: ['./breakloan.component.css']
})
export class BreakloanComponent implements OnInit {
  public post_action = false;
  @Input('request_id') request_id: number;
  @Output() closeModal = new EventEmitter();
  @Output() showMessage = new EventEmitter();
  @Output() openThePaymentForFinalBreaking = new EventEmitter();
  canDoNothing=false;
  canDoNothingMessage = "";
  currentUser: any;
  break_loan = { REQUEST_ID: 0, IS_TOP_UP: '6', BID_PRINCIPAL: 0, REQUEST_CURRENCY_ID: '', REQUEST_PERIOD_ID: 2, REQUEST_RATE_PERIOD_ID: 2 }
  data: any;
  loan_currency = "NGN";
  countries: any;
 
  confirmingAction=false;
  new_principal() {
    this.newprincipal = this.break_loan.BID_PRINCIPAL + this.data.loan.LOAN_BALANCE
  }
  closeM() {
    this.closeModal.emit()
  }
  public pay_opt = [
    { value: '6', 'display': 'Pay Balance' },
    { value: '8', 'display': 'Top Up' },
    { value: '7', 'display': 'Rollover' }
  ]
  public loan_duration = "Months";
  public interest_duration = "Per Month";
  loading = false;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    height: '34px',
    width: '100%',
    dateFormat: 'yyyy-mm-dd',
    openSelectorTopOfInput: false,
  };
  public selDate: IMyDate = { year: 0, month: 0, day: 0 };
  public selDate_: IMyDate = { year: 0, month: 0, day: 0 };
  request_step = '0';
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": 1, "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": 2, "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": 3, "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": 4, "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
    ;
  newprincipal = 0;
  constructor(public optionsService: OptionsserviceService, public router: Router, public route: ActivatedRoute, 
    public loansService: LoansService, public customerService: CustomerService, 
    public userService: UserService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.optionsService.getCountries().subscribe(countries => this.countries = countries);
  }

  ngOnInit() { 
    this.break_loan.IS_TOP_UP = this.pay_opt[0].value
    this.loansService.breakLoan(this.currentUser.token, this.request_id).subscribe(data => {
      if(data.status==false){
       // this.closeModal.emit();
        let message = {
          type: "error",
          message: data.message
        }
        this.showMessage.emit(message)
        this.canDoNothing = true;
        this.canDoNothingMessage = data.message;
      }else{
        this.data = data
        this.newprincipal = data.loan.LOAN_BALANCE
        let d: Date = new Date(data.breaking_date);

        this.selDate = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        };
        let d_: Date = new Date(data.payment_date);

        this.selDate_ = {
          year: d_.getFullYear(),
          month: d_.getMonth() + 1,
          day: d_.getDate()
        };
        this.break_loan.REQUEST_PERIOD_ID = data.loan.REQUEST_PERIOD_ID;
        this.break_loan.REQUEST_RATE_PERIOD_ID = data.loan.REQUEST_RATE_PERIOD_ID;
      }
    });
  }
  changeCurrency(c) {
    this.loan_currency = c.currency[0];
    this.break_loan.REQUEST_CURRENCY_ID = this.loan_currency
  }
  sendBreakLoan() {
    this.loansService.sendBreakLoan(this.currentUser.token, this.request_id, this.break_loan).subscribe(data => {
      if (data.status == '1') {
        if (this.break_loan.IS_TOP_UP == '6') {
          this.openThePaymentForFinalBreaking.emit(data)
          //this.request_step = '3';
        } else {
          let other_action = {
            post_action:'edit_contract',
            request_id:data.request_id,
            is_top_up:this.break_loan.IS_TOP_UP
          }
          this.closeModal.emit(other_action);
        }
      }
    });
  }
  onDateChanged(event) {
    this.loansService.adjustTheCurrentBalance(this.currentUser.token, this.request_id, event.formatted, this.break_loan.IS_TOP_UP).subscribe(data => {
      if (data.status == '0') {
        if (event.formatted != "") {
          let message = {
            type: "error",
            message: data.data
          }
          this.showMessage.emit(message)
        }

        let d: Date = new Date();

        this.selDate = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        };

      } else {
        let d_: Date = new Date(data.payment_date);
        this.selDate_ = {
          year: d_.getFullYear(),
          month: d_.getMonth() + 1,
          day: d_.getDate()
        };
        this.data = data.data
      }
    });
  }

  changeDuration(d, T) {
    if (T === 1) {
      //console.log(this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"])
      this.loan_duration = this.loan_durations[d]["LOAN_DURATION"];
      this.break_loan.REQUEST_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }
    if (T === 2) {
      this.interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.break_loan.REQUEST_RATE_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }

  }
}
