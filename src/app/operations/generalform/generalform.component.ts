import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generalform',
  templateUrl: './generalform.component.html',
  styleUrls: ['./generalform.component.css']
})
export class GeneralformComponent implements OnInit {

  @Input('product') product: any;
  @Input('loan_currency') loan_currency: any;
  @Input('countries') countries: any;
  @Input('loan_duration') loan_duration: any;
  @Input('loan_durations') loan_durations: any;
  @Input('max_loan_duration') max_loan_duration: any;
  @Input('loading') loading: any;
  @Output() saveForm = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeCurrency(c) {
    this.loan_currency = c.currency[0];
    this.product.LOAN_CURRENCY = c.callingCode[0];
  }
  changeDuration(d, T) {
    if (T === 1) {
      this.loan_duration = this.loan_durations[d]["LOAN_DURATION"];
      this.product.LOAN_DURATION_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }

  }
  changeMaxDuration(d, T) {

  }
  save(value, valid) {

    this.saveForm.emit({ value: value, valid: valid });

  }

}
