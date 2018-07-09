import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loanamount',
  templateUrl: './loanamount.component.html',
  styleUrls: ['./loanamount.component.css']
})
export class LoanamountComponent implements OnInit {

  @Input('product') product: any;
  @Output() saveForm = new EventEmitter();
  @Input('special_interest_duration') special_interest_duration: any;
  @Input('loan_durations') loan_durations: any;
  @Input('loading') loading: any;

  constructor() { }

  ngOnInit() {
  }

  changeDuration(d, T) {

    if (T === 3) {
      this.special_interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.product.LOAN_INTEREST_ON_AMOUNT_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }

  }

  saveSpecialLoanInterest(value, valid){
    this.saveForm.emit({ value: value, valid: valid });
  }

}
