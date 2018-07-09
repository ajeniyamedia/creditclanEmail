import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-interestform',
  templateUrl: './interestform.component.html',
  styleUrls: ['./interestform.component.css']
})
export class InterestformComponent implements OnInit {

  @Input('product') product: any;
  @Input('loan_currency') loan_currency: any;
  @Input('countries') countries: any;
  @Input('interest_duration') interest_duration: any;
  @Input('loan_durations') loan_durations: any;
  @Input('max_loan_duration') max_loan_duration: any;
  @Input('loading') loading: any;
  @Output() saveForm = new EventEmitter();
  @Input('special_interest_duration') special_interest_duration:any;


  constructor() { }

  ngOnInit() {
  }

  changeCurrency(c) {
    this.loan_currency = c.currency[0];
    this.product.LOAN_CURRENCY = c.callingCode[0];
  }
  changeDuration(d, T) {
   
    if (T === 2) {
      this.interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.product.LOAN_INTEREST_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }
    if (T === 3) {
      this.special_interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.product.LOAN_INTEREST_ON_AMOUNT_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }

  }
  changeMaxDuration(d, T) {

  }
  save(value, valid) {

    this.saveForm.emit({ value: value, valid: valid });

  }
  changeFrequency(event) {
    if (event.target.value === '1') {
      this.product.REPAYMENT_TYPE_ID = '3';
    }
  }

}
