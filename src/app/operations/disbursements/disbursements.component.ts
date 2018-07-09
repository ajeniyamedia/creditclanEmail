import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
declare var swal: any;
@Component({
  selector: 'app-disbursements',
  templateUrl: './disbursements.component.html',
  styleUrls: ['./disbursements.component.css']
})
export class DisbursementsComponent implements OnInit {

  public loanformvisible = false;
  public currentUser: any;
  public preloading = true;
  public disbursements = [];
  public otherClosed = true;
  public secOpen = 0;
  public disbursing = false;
  public disbursement: any;
  public paytype = "make";
  public banks = [];
  public security_question = "";
  public loading = false;
  public confirm_model = { PAYMENT_QUEUE_ID: '', LENDER_BANK_ACCOUNT_ID: '', SECURITY_QUESTION_ANSWER: '' };
  public nigerian_banks = [];
  complexForm: FormGroup;
  newAccountForm: FormGroup;
  walletPaymentForm: FormGroup;
  bankPaymentForm: FormGroup;
  public addingAccount = false;
  public VERIFY_STATUS = false;
  public newaccountconfirmed = false;
  public continuetosave = false;
  public choosingPayProcess = false;
  public payProcessChosen = false;
  public walletChosen = false;
  public bankChosen = false;
  public makingFinalPayment = false;
  public paymentHasBeenProcessed = false;
  public paymentConfirmed = false;
  public otpError = false;
  public otpHBSFC = false;
  public otpHBR = false;
  public otp = { CONFIRM_OTP_CODE: '', flutterChargeReference: '' };
  public fresponse = "";
  public otpErrorMessage = "";

  constructor(public fb: FormBuilder, public operationsService: OperationsService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.operationsService.getNigerianBanks(this.currentUser.token).subscribe(nigerian_banks => this.nigerian_banks = nigerian_banks);
    this.complexForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'PAYMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    })
    this.newAccountForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'BANK_ID': [null, Validators.required],
      'LENDER_ACCOUNT_NUMBER': [null, Validators.required],
      'LENDER_BANK_ACCOUNT_NAME': '',
      'PAYMENT_QUEUE_ID': '',
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
      'RECURRENT_BILLING_TOKEN': ''
    })
    this.walletPaymentForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'PAYMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '2',
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    })
    this.bankPaymentForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'PAYMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '3',
      'CONNECTED_ACCOUNT_ID': [null, Validators.required],
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
    })
  }
  payWithWallet() {
    this.payProcessChosen = true;
    this.walletChosen = true;
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.paymentConfirmed = false;
    this.otpError = false;
  }
  payWithBank() {
    this.payProcessChosen = true;
    this.bankChosen = true;
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.paymentConfirmed = false;
    this.otpError = false;
  }
  setAsConnectedAccountId(ACCOUNT_CARD_ID, REQUEST_ID, PAYMENT_QUEUE_ID) {
    this.loading = true; 
    this.operationsService.setAsConnectedAccountId(this.currentUser.token, ACCOUNT_CARD_ID, REQUEST_ID, PAYMENT_QUEUE_ID, 1, 1)
      .subscribe(status => { 
        this.loading = false;
        this.disbursement = status.disbursement;
        if (status.status == true) {
          (<FormControl>this.bankPaymentForm.controls['CONNECTED_ACCOUNT_ID'])
            .setValue(status.disbursement.CONNECTED_ACCOUNT, { onlySelf: true });
          // swal({
          //     title: 'Account Change',
          //     text: status.message,
          //     type: 'success',
          //     showCloseButton: true 
          //   })
        } else {

        }
      });
  }
  payBorrower() {
    this.choosingPayProcess = true;
  }
  cancelPayment() {

    this.addingAccount = false;
    this.loading = false;
    this.choosingPayProcess = false;
    this.payProcessChosen = false;
    this.walletChosen = false;
    this.bankChosen = false;
    this.makingFinalPayment = false
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.paymentConfirmed = false;
    this.otpError = false;
  }
  doNotUseAccount() {
    this.newaccountconfirmed = false;
    this.VERIFY_STATUS = false;
    this.continuetosave = false;
    this.makingFinalPayment = false
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.paymentConfirmed = false;
    this.otpError = false;
  }
  addNewCustomerAccount() {
    this.newaccountconfirmed = false;
    this.VERIFY_STATUS = false;
    this.continuetosave = false;
    this.addingAccount = true;
    this.makingFinalPayment = false;
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.paymentConfirmed = false;
    this.otpError = false;
  }
  doAddNewBorrowerAccount(value: any): void {
    this.loading = true; 
    this.operationsService.confirmBankAccount(this.currentUser.token, value)
      .subscribe(status => { 
        this.loading = false;

        if (status.status == true) {
          if (status.data.status != "error") {
            this.newaccountconfirmed = true;
            this.VERIFY_STATUS = true;
            (<FormControl>this.newAccountForm.controls['LENDER_BANK_ACCOUNT_NAME'])
              .setValue(status.data.data.account_name, { onlySelf: true });

            this.continuetosave = true;
          } else {
            this.VERIFY_STATUS = true;
            this.newaccountconfirmed = false;

          }
        } else {
          console.log(3)
          this.VERIFY_STATUS = true;
          this.newaccountconfirmed = false;
        }
      });
  }
  saveBorrowerAccount() {
    this.loading = true; 
    this.operationsService.saveBorrowerAccount(this.currentUser.token, this.newAccountForm.value, 1, 1)
      .subscribe(status => { 
        this.loading = false;
        if (status.status) {
          this.disbursement = status.disbursement;
          this.addingAccount = false;
        } else {

        }


      });
  }
  paymentProcessDone() {
    this.disbursing = false;
    this.getDisbursements();
  }
  doPaymentConfirm(value: any): void {
    this.otpError = false;
    this.paytype = "confirm";
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true; 
    this.operationsService.doPaymentConfirm(this.currentUser.token, value, 1, 1)
      .subscribe(status => { 
        this.loading = false;

        if (status.status) {
          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
        } else {
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = false;
          this.otpError = true;
        }


      });
  }
  payBorrowerWithBank(value: any): void {
    this.makingFinalPayment = true;
    this.loading = true;
    this.otpError = false;
    this.otpHBR = false;
    this.otp.CONFIRM_OTP_CODE = "";
    this.operationsService.payBorrowerWithBank(this.currentUser.token, value)
      .subscribe(status => { 
        this.loading = false;
        if (status.status == true) {
          if (status.data.status == "error") {
            this.makingFinalPayment = false;
            this.paymentConfirmed = false;
            this.otpError = true;
            this.otpErrorMessage = status.data.message
          } else {
            this.otp.flutterChargeReference = status.data.data.transfer.flutterChargeReference;
            let authparams_data = status.data.data.authparams[0]
            this.fresponse = authparams_data.description;
            this.makingFinalPayment = true;
            this.otpHBR = true;
          }
        } else {
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = true;
          this.paymentConfirmed = false;
        }
      });
  }
  confirmOTPForTransfer() {
    this.loading = true; 
    this.operationsService.confirmOTPForTransferToBorrower(this.currentUser.token, this.otp, this.bankPaymentForm.value)
      .subscribe(status => { 
        this.loading = false;
        this.otpHBSFC = true;
        if (status.status == true) {
          if (status.data.status == "error") {
            this.makingFinalPayment = true;
            this.paymentHasBeenProcessed = true;
            this.otpError = true;
            this.otpErrorMessage = status.data.message
          } else {
            this.paymentHasBeenProcessed = true;
            this.otpError = false;
            this.paymentConfirmed = true;
            this.otpHBR = false;
          }
        } else {
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = false;
          this.otpError = true;
        }
      });
  }
  confirmBorrowerHasBeenPaid(value: any): void {
    this.otpError = false;
    this.paytype = "make";
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true; 
    this.operationsService.confirmBorrowerHasBeenPaid(this.currentUser.token, value)
      .subscribe(status => { 
        this.loading = false;
        if (status.status) {
          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
        } else {
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = false;
          this.otpError = true;
        }


      });
  }
  cancelPayment_() {
    this.paytype = 'make';
    this.addingAccount = false;
    this.loading = false;
    this.choosingPayProcess = false;
    this.payProcessChosen = false;
    this.walletChosen = false;
    this.bankChosen = false;
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.paymentConfirmed = false;
    this.otpError = false;
  }
  switchpay(type) {
    this.paytype = type;
    this.addingAccount = false;
    this.loading = false;
    this.choosingPayProcess = false;
    this.payProcessChosen = false;
    this.walletChosen = false;
    this.bankChosen = false;
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.paymentConfirmed = false;
    this.otpError = false;
    console.log(this.paytype)
  }
  addBorrowerAccount(disbursement) {

  }
  processDisbursement(disburse) {
    this.disbursing = true;
    this.disbursement = disburse;
    this.paytype = "make";
    this.addingAccount = false;
    this.loading = false;
    this.choosingPayProcess = false;
    this.payProcessChosen = false;
    this.walletChosen = false;
    this.bankChosen = false;
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.paymentConfirmed = false;
    this.otpError = false;
    (<FormControl>this.complexForm.controls['PAYMENT_QUEUE_ID'])
      .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });

    (<FormControl>this.newAccountForm.controls['PAYMENT_QUEUE_ID'])
      .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });

    (<FormControl>this.complexForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });

    (<FormControl>this.newAccountForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });

    (<FormControl>this.complexForm.controls['REQUEST_ID'])
      .setValue(disburse.REQUEST_ID, { onlySelf: true });

    (<FormControl>this.newAccountForm.controls['REQUEST_ID'])
      .setValue(disburse.REQUEST_ID, { onlySelf: true });
    (<FormControl>this.bankPaymentForm.controls['PAYMENT_QUEUE_ID'])
      .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });

    (<FormControl>this.walletPaymentForm.controls['PAYMENT_QUEUE_ID'])
      .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });
    (<FormControl>this.walletPaymentForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });

    (<FormControl>this.walletPaymentForm.controls['REQUEST_ID'])
      .setValue(disburse.REQUEST_ID, { onlySelf: true });

    (<FormControl>this.bankPaymentForm.controls['CONNECTED_ACCOUNT_ID'])
      .setValue(this.disbursement.CONNECTED_ACCOUNT, { onlySelf: true });
    (<FormControl>this.bankPaymentForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });

    (<FormControl>this.bankPaymentForm.controls['REQUEST_ID'])
      .setValue(disburse.REQUEST_ID, { onlySelf: true });

  }
  closeOverlay() {
    this.disbursing = false;
  }
  openSec(sec) {
    this.otherClosed = true;
    this.secOpen = sec;
  }
  ngOnInit() {
    this.getDisbursements();
    this.getBanks();
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.otpError = false;
  }

  getDisbursements() {
    this.operationsService.getDisbursements(this.currentUser.token)
      .subscribe(disburses => { 
        this.disbursements = disburses.disbursements;
        this.preloading = false;
        this.security_question = disburses.security_question.QUESTION;
        this.loanformvisible = true;
        if (disburses.count > 0) {
          this.loanformvisible = true;
        } else {
          this.loanformvisible = false;
        }
      });
  } 
  getBanks() {
    this.operationsService.getBanks(this.currentUser.token)
      .subscribe(banks => { 
        this.banks = banks;
      });
  }
}
