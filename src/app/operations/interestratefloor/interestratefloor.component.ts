import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-interestratefloor',
  templateUrl: './interestratefloor.component.html',
  styleUrls: ['./interestratefloor.component.css']
})
export class InterestratefloorComponent implements OnInit {

  @Input('product') product: any;
  @Input('floor_rate') floor_rate: any;
  @Output() saveFpayorm = new EventEmitter();
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
    this.saveFpayorm.emit({ value: value, valid: valid });
  }

}
