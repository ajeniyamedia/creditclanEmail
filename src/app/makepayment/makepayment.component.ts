import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { DataService, OptionsserviceService, UserService, LoansService, AuthenticationService, StorageService } from '../_services/index';
import { User } from '../_models/index';
@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.component.html',
  styleUrls: ['./makepayment.component.css']
})
export class MakepaymentComponent implements OnInit {
  state: any;
  @Input('loan_viewed') loan_viewed: any;
  public currentUser: any;
  @Input('makingPayment') makingPayment = false; 
  @Output() paymentHasBeenQueued = new EventEmitter();
  default_bank: any;
  public pay_opt = [
    { value: '1' },
    { value: '2' },
    { value: '3' }
  ]
  payment = { PAY_WITH: '0', LENDER_ACCOUNT_ID: 0, REQUEST_ID: 0, PAYMENT_DATE: '', AMOUNT_TO_PAY: '0', PAYMENT_OPTION: '1' };
  loading = false;
  payment_done = false;
  payment_status = { status: '0', AMOUNT: '0' };
  choosePayment = false;
  chosenPayment = false;
  constructor(private DataService: DataService, public optionsService: OptionsserviceService, 
    public fb: FormBuilder, public loansService: LoansService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.optionsService.getDefaultBank(this.currentUser.token).subscribe(bank => {
      this.default_bank = bank;
      this.payment.LENDER_ACCOUNT_ID = bank.LENDER_ACCOUNT_GL;
    });
  }
  backtoloansummary() {
    this.DataService.onBackToLoanSummary.emit(true);
  }
  ngOnInit() {
    this.loansService.getRepaymentDetails(this.currentUser.token, this.loan_viewed)
      .subscribe(customers => {
        this.state = customers;
        this.payment.REQUEST_ID = this.loan_viewed;
        this.payment.PAYMENT_OPTION = this.pay_opt[0].value;
      });
  }
  closeOverlay() {

  }
  paywithwallet() {
    this.payment.PAY_WITH = '1';
    this.chosenPayment = true;
    this.loading = true;
    this.loansService.makepayment(this.currentUser.token, this.payment)
      .subscribe(result => {
        this.payment_done = true;
        this.loading = false;
        this.payment_status.status = result.status;
        this.payment_status.AMOUNT = result.AMOUNT;
      });
  }
  paywithbank() {
    this.makingPayment = true;
    this.choosePayment = true;
    this.payment.PAY_WITH = '2';
    this.chosenPayment = true;
    this.loading = true;
    this.loansService.makepayment(this.currentUser.token, this.payment)
      .subscribe(result => {
        if(result.status=="1"){
          if(result.send_payments_to_queue=='0'){
            this.paymentHasBeenQueued.emit(result)
          }else{
            this.payment_done = true;
            this.loading = false;
            this.payment_status.status = result.status;
            this.payment_status.AMOUNT = result.AMOUNT;
          }
        }
      });
  }
  makepayment() {
    this.makingPayment = true;
    this.choosePayment = true;

  }
}

