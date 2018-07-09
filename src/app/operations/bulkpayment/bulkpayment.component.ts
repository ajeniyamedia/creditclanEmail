import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bulkpayment',
  templateUrl: './bulkpayment.component.html',
  styleUrls: ['./bulkpayment.component.css']
})
export class BulkpaymentComponent implements OnInit {
  public wallet_balance = "";
  public wallet_status = false;
  @Input('bulkpayrequests') bulkpayrequests:any;
  @Output() modalClosed = new EventEmitter();
  loading=false;
  bulk_pay:any;
  @Input('paytype') paytype = "confirm";
  public banks = [];
  @Input('security_question') security_question: any;
  complexForm: FormGroup;
  newAccountForm: FormGroup;
  walletPaymentForm: FormGroup;
  walletWithdrawalForm: FormGroup;
  bankPaymentForm: FormGroup;
  investorConfirmPayment: FormGroup;
  investorConfirmPayment_: FormGroup;
  repaymentConfirmPayment: FormGroup;
  customerrepaymentConfirmPayment: FormGroup;
  walletFundingForm: FormGroup;
  walletFundingConfimForm: FormGroup;
  paymentConfirmRollbackForm: FormGroup;
  sendRepaymentLink: FormGroup;
  public currentUser: any;
  public nigerian_banks:any;
  constructor(private DataService: DataService, public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.operationsService.getNigerianBanks(this.currentUser.token).subscribe(nigerian_banks => this.nigerian_banks = nigerian_banks);

    this.investorConfirmPayment = fb.group({
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    });

    this.sendRepaymentLink = fb.group({
      'REPAYMENT_SCHEDULE_ID': '',
      'REQUEST_ID': '',
      'PEOPLE_ID': '',
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'WHEN_TO_SEND':'',
      'LENDER_ID':''
    });

    this.investorConfirmPayment_ = fb.group({
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    });
    this.repaymentConfirmPayment = fb.group({
      'PAYMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    });
    this.customerrepaymentConfirmPayment = fb.group({
      'LOAN_REPAYMENT_ID': '',
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
    });
    this.complexForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'PAYMENT_QUEUE_ID': '',
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    })
    this.paymentConfirmRollbackForm = fb.group({
      'ROLLBACK_ID':'',
      'PAYMENT_QUEUE_ID': '',
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    })
    this.walletFundingConfimForm = fb.group({
      'PAYMENT_QUEUE_ID': '',
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
      'WALLET_WITHDRAWAL_REQUEST_ID':''
    })
    this.newAccountForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'BANK_ID': [null, Validators.required],
      'LENDER_ACCOUNT_NUMBER': [null, Validators.required],
      'LENDER_BANK_ACCOUNT_NAME': '',
      'PAYMENT_QUEUE_ID': '',
      'INVESTMENT_QUEUE_ID': '',
      'WALLET_WITHDRAWAL_REQUEST_ID': '',
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
      'RECURRENT_BILLING_TOKEN': ''
    })
    this.walletPaymentForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'PAYMENT_QUEUE_ID': '',
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '2',
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    })
    this.walletWithdrawalForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'WALLET_WITHDRAWAL_REQUEST_ID': '',
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
    })
    this.walletFundingForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'WALLET_WITHDRAWAL_REQUEST_ID': '',
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'DATE_ADDED': '',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
    })
    this.bankPaymentForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'PAYMENT_QUEUE_ID': '',
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '3',
      'CONNECTED_ACCOUNT_ID': [null, Validators.required],
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    })
  }
  paymentProcessDone(){
    this.modalClosed.emit();
  }
  ngOnInit() {
    this.loading = true; 
    this.operationsService.bulkpaystatus(this.currentUser.token, this.bulkpayrequests)
      .subscribe(data => { 
        this.loading = false;
        this.bulk_pay = data;
        this.security_question = data.security_question.QUESTION;
        this.getWalletData();
      });
    this.getBanks();
    
  }
  getWalletData(){
    this.operationsService.getWalletData(this.currentUser.token, this.bulk_pay.total)
    .subscribe(data => {
      this.wallet_balance = data.cu;
      this.wallet_status = data.wallet_status;
    });
  }
  getBanks() {
    this.operationsService.getBanks(this.currentUser.token)
      .subscribe(banks => { 
        this.banks = banks.banks;
      });
  }
  
  switchpay(type) {
    this.paytype = type; 
    this.loading = false; 
  }
  otpError=false;
  confirmBorrowerHasBeenPaidForBulk(value: any): void {
    this.otpError = false;
    this.paytype = "make"; 
    this.loading = true; 
    this.operationsService.confirmBorrowerHasBeenPaidForBulk(this.currentUser.token, value, this.bulkpayrequests)
      .subscribe(status => {
        this.loading = false;
        
        if (status.status) {
          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
        } else {
          if(status.error_type=='1'){
            this.makingFinalPayment = false;
            this.paymentHasBeenProcessed = false;
            this.otpError = true;
            this.otpmessage = status.message
          }
          if(status.error_type=='2'){
            this.makingFinalPayment = false;
            this.paymentHasBeenProcessed = true;
            this.otpError = false;
            this.paymentConfirmed = false;
          }
        }

      });
  }
  otpmessage="";
  paymentConfirmed=false;
  makingFinalPayment=false;
  paymentHasBeenProcessed=false;
  doPaymentConfirmForBulk(value: any): void {
    this.otpError = false;
    this.paytype = "confirm"; 
    this.loading = true; 
    this.operationsService.doPaymentConfirmForBulk(this.currentUser.token, value, this.bulkpayrequests)
      .subscribe(status => {
        this.loading = false;
        
        if (status.status) {
          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
        } else {
          if(status.error_type=='1'){
            this.makingFinalPayment = false;
            this.paymentHasBeenProcessed = false;
            this.otpError = true;
          }
          if(status.error_type=='2'){
            this.makingFinalPayment = false;
            this.paymentHasBeenProcessed = true;
            this.otpError = false;
            this.paymentConfirmed = false;
          }
        }

      });
  }
}
