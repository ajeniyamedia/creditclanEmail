import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-wallettransfer',
  templateUrl: './wallettransfer.component.html',
  styleUrls: ['./wallettransfer.component.css']
})
export class WallettransferComponent implements OnInit {
  @Input('account_details') account_details: any;
  @Input('ledger') ledger: any;
  @Input('banks') banks: any;
  @Input('loading') loading = false;
  @Input('paymentHasBeenProcessed') paymentHasBeenProcessed = false;
  @Input('paymentConfirmed') paymentConfirmed = false;
  @Input('security_question') security_question = ""
  @Input('otpError') otpError = ""
  @Input('api_message') api_message = ""
  @Input('fundingQueued') fundingQueued = false;
  @Output() doWalletTransfer = new EventEmitter();
  @Output() doInitiateFuning = new EventEmitter();
  @Output() doQueueFuning = new EventEmitter();
  @Input('ttype') ttype = "0";
  @Input('cu') cu = "0";
  BID_PRINCIPAL = 0;
  repaymentConfirmPayment: FormGroup;
  complexForm: FormGroup;
  customerFund: FormGroup;
  @Input('makingFinalPayment') makingFinalPayment = false;
  constructor(public fb: FormBuilder) {

    this.complexForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'AMOUNT': [null, Validators.required],
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required]
    })
    this.customerFund = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'AMOUNT': [null, Validators.required],
      'NOTES': [null, Validators.required]
    })
  }

  ngOnInit() {
    //this.complexForm.a
    console.log(this.account_details)
  }
  doPaymentConfirm(value) {
    this.doWalletTransfer.emit(value)
  }
  initiateCustomerWalletFund(value) {
    this.doInitiateFuning.emit(value)
  }
  paymentProcessDone() {

  }
  QueueWalletFunding() {
    this.doQueueFuning.emit({ BID_PRINCIPAL: this.BID_PRINCIPAL })
  }
}
