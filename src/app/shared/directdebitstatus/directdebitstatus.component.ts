import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService, LoansService } from '../../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var swal: any;

@Component({
  selector: 'app-directdebitstatus',
  templateUrl: './directdebitstatus.component.html',
  styleUrls: ['./directdebitstatus.component.css']
})
export class DirectdebitstatusComponent implements OnInit {
  debit_all_card: any;
  confirmCardAD = false;
  loan: any;
  cards: any; 
  @Input('record_type') record_type = '1';
  @Input('is_cancel') is_cancel = '0';
  @Input('schedule_type') schedule_type = '1';
  @Input('disburse') disburse: any;
  @Input('repayment') repayment: any;
  @Input('sub') sub = '0';
  @Input('pqueue_id') pqueue_id = '0';
  @Input('autodebit') autodebit = '0';
  @Input('platformwallet') platformwallet: any;
  @Output() showMessage = new EventEmitter();
  @Output() paymentHasBeenProcessedFinally = new EventEmitter();
  @Output() closePaymentDialog = new EventEmitter();
  autodebit_form = {
    SECURITY_QUESTION_ANSWER: ''
  }
  record_type_ = '';
  payment_type = 'Disbursement';
  public loanformvisible = false;
  public currentUser: any;
  public preloading = true;
  public disbursements = [];
  public otherClosed = true;
  public secOpen = 0;
  public disbursing = false;
  public disbursement: any;
  @Input('paytype') paytype = 'make';
  public banks = [];
  @Input('security_question') security_question: any;
  public loading = false;
  public confirm_model = { PAYMENT_QUEUE_ID: '', LENDER_BANK_ACCOUNT_ID: '', SECURITY_QUESTION_ANSWER: '' };
  public nigerian_banks = [];
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
  debitAllForm: FormGroup;
  debitInstruction: FormGroup;
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
  public fresponse = '';
  public otpErrorMessage = '';
  public account_type = 'Borrower Account';
  public withdrawal_step = '0';
  public withdrawal_option = '0';
  public withdrawal_step_ = '1';
  public inv_error = '';
  public wallet_balance = '';
  public wallet_status = false;
  public otpmessage = '';
  public result: any;
  constructor(public toastr: ToastrService, private DataService: DataService, public loansService: LoansService,
    public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
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
      'WHEN_TO_SEND': '',
      'LENDER_ID': ''
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
      'PAYMENT_QUEUE_ID': '',
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': [null, Validators.required],
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
      'ADJUST_CONTRACT_DATE': false,
    })
    this.debitInstruction = fb.group({
      'PAYMENT_QUEUE_ID': '',
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': '',
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
      'ADJUST_CONTRACT_DATE': false,
    })
    this.debitAllForm = fb.group({
      'PAYMENT_QUEUE_ID': '',
      'INVESTMENT_QUEUE_ID': '',
      'DISBURSEMENT_MODE': '1',
      'LENDER_BANK_ACCOUNT_ID': '',
      'SECURITY_QUESTION_ANSWER': [null, Validators.required],
      'PEOPLE_ID': '',
      'REQUEST_ID': '',
      'ADJUST_CONTRACT_DATE': false,
    })
    this.paymentConfirmRollbackForm = fb.group({
      'ROLLBACK_ID': '',
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
      'WALLET_WITHDRAWAL_REQUEST_ID': ''
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
      'ADJUST_CONTRACT_DATE': ''
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
      'ADJUST_CONTRACT_DATE': ''
    })
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  changewithtype(event) {
    this.withdrawal_step = '1';
    this.withdrawal_option = event;
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
  payInvestor() {
    this.withdrawal_step = '4';
  }
  setAsConnectedAccountId(ACCOUNT_CARD_ID, REQUEST_ID, PAYMENT_QUEUE_ID) {
    this.loading = true;
    this.operationsService.setAsConnectedAccountId(this.currentUser.token, ACCOUNT_CARD_ID, REQUEST_ID, PAYMENT_QUEUE_ID, this.record_type, this.schedule_type)
      .subscribe(status => {
        this.loading = false;
        this.disbursement = status.disbursement;

        if (status.status == true) {
          if (this.record_type == '2') {
            console.log(this.bankPaymentForm.value);
            (<FormControl>this.bankPaymentForm.controls['CONNECTED_ACCOUNT_ID']).setValue(status.disbursement.CONNECTED_ACCOUNT_ID, { onlySelf: true });
          } else {
            (<FormControl>this.bankPaymentForm.controls['CONNECTED_ACCOUNT_ID']).setValue(status.disbursement.CONNECTED_ACCOUNT_ID, { onlySelf: true });
          }


        } else {

        }
      });
  }
  setAsConnectedCard(ACCOUNT_CARD_ID, REQUEST_ID) {
    this.loading = true;
    this.operationsService.setAsConnectedCard(this.currentUser.token, ACCOUNT_CARD_ID, REQUEST_ID)
      .subscribe(status => {
        this.loading = false;
        this.loan = status.loan;
      });
  }
  setAsWithdrawalAccount(ACCOUNT_CARD_ID, WALLET_WITHDRAWAL_REQUEST_ID) {
    this.loading = true;
    this.operationsService.setAsWithdrawalAccount(this.currentUser.token, ACCOUNT_CARD_ID, WALLET_WITHDRAWAL_REQUEST_ID)
      .subscribe(status => {
        this.loading = false;
        this.disburse = status.disbursement;

      });
  }
  payBorrower() {
    this.choosingPayProcess = true;
    this.payWithWallet()
  }
  doWithdrawal() {
    this.choosingPayProcess = true;
    this.payProcessChosen = true;
    this.walletChosen = true;
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.paymentConfirmed = false;
    this.otpError = false;
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
    this.closePaymentDialog.emit({})
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

        if (status.status == 'success') {
          if (status.data.status != 'error') {
            this.newaccountconfirmed = true;
            this.VERIFY_STATUS = true;
            (<FormControl>this.newAccountForm.controls['LENDER_BANK_ACCOUNT_NAME'])
              .setValue(status.data.account_name, { onlySelf: true });

            this.continuetosave = true;
          } else {
            this.VERIFY_STATUS = true;
            this.newaccountconfirmed = false;

          }
        } else {
          this.VERIFY_STATUS = true;
          this.newaccountconfirmed = false;
        }
      });
  }
  saveBorrowerAccount() {
    this.loading = true;
    this.operationsService.saveBorrowerAccount(this.currentUser.token, this.newAccountForm.value, this.schedule_type, this.record_type)
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
    if (this.sub != '0') {
      this.paymentHasBeenProcessedFinally.emit(this.sub);
    } else {
      this.disbursing = false;
      this.getDisbursements();
    }

  }
  doTransferToWallet(value: any): void {
    this.otpError = false;
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true;
    this.operationsService.doTransferToWallet(this.currentUser.token, value, this.schedule_type, this.record_type)
      .subscribe(status => {
        this.loading = false;
        if (this.record_type == '2') {
          this.withdrawal_step = '2';
          if (status.status == '1') {
            this.paymentHasBeenProcessed = true;
            this.otpError = false;
            this.paymentConfirmed = true;
          } else {
            this.makingFinalPayment = false;
            this.paymentHasBeenProcessed = false;
            this.otpError = true;
          }
        } else {
          if (this.record_type == '3') {
            this.withdrawal_step = '2';
            if (status.status == '1') {
              this.paymentHasBeenProcessed = true;
              this.otpError = false;
              this.paymentConfirmed = true;
            } else {
              this.makingFinalPayment = false;
              this.paymentHasBeenProcessed = false;
              this.otpError = true;
            }
          } else {
            if (status.status) {
              this.paymentHasBeenProcessed = true;
              this.otpError = false;
              this.paymentConfirmed = true;
            } else {
              this.makingFinalPayment = false;
              this.paymentHasBeenProcessed = false;
              this.otpError = true;
            }
          }

        }



      });
  }
  doPaymentConfirm_(value: any): void {

  }
  doWalletFundingConfirm(value: any): void {
    this.otpError = false;
    this.paytype = 'confirm';
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true;
    this.operationsService.doWalletFundingConfirm(this.currentUser.token, value)
      .subscribe(status => {
        this.loading = false;
        if (this.record_type == '2') {
          this.withdrawal_step = '2';
          if (status.status == '1') {
            this.paymentHasBeenProcessed = true;
            this.otpError = false;
            this.paymentConfirmed = true;
          } else {
            this.makingFinalPayment = false;
            this.paymentHasBeenProcessed = false;
            this.otpError = true;
          }
        } else {
          if (this.record_type == '3') {
            this.withdrawal_step = '2';
            if (status.status == '1') {
              this.paymentHasBeenProcessed = true;
              this.otpError = false;
              this.paymentConfirmed = true;
            } else {
              this.makingFinalPayment = false;
              this.paymentHasBeenProcessed = false;
              this.otpError = true;
            }
          } else {
            if (status.status) {
              this.paymentHasBeenProcessed = true;
              this.otpError = false;
              this.paymentConfirmed = true;
            } else {
              this.makingFinalPayment = false;
              this.paymentHasBeenProcessed = false;
              this.otpError = true;
            }
          }

        }



      });
  }
  dopaymentConfirmRollbackForm(value: any): void {
    this.loading = true;
    this.operationsService.dopaymentConfirmRollbackForm(this.currentUser.token, value, this.schedule_type, this.record_type)
      .subscribe(status => {
        this.loading = false;
        this.result = status;
        if (status.status == false) {
          this.showMessage.emit(status)
        } else {
          this.showMessage.emit(status)
          this.paymentHasBeenProcessed = true;

        }
      });
  }
  processDone = '0';
  amount_debited = 0;
  initiateAutodebit() {
    this.loading = true;
    this.processDone = '0';
    this.operationsService.initiateAutodebit(this.currentUser.token, this.autodebit_form, this.loan.REQUEST_ID, this.loan.CONNECTED_CARD_ID, this.repayment)
      .subscribe(status => {
        this.loading = false;

        if (status.status == true) {
          if (status.data.percent >= 100) {
            this.processDone = '1';
          } else {
            this.processDone = '3';
            this.amount_debited = status.data.debited;
          }

          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
          this.showMessage.emit(status.data.message)
          this.otpmessage = status.data.message
        } else {
          this.processDone = '2';
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = false;
          this.otpError = true;
          this.otpmessage = status.data.message;
          this.showError(status.data.response.data.message);
        }
      });
  }
  doSendRepaymentLink(value: any): void {
    this.otpError = false;
    this.paytype = 'confirm';
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true;
    this.processDone = '0';
    this.operationsService.doSendRepaymentLink(this.currentUser.token, value)
      .subscribe(status => {
        this.loading = false;
        if (status.status == true) {
          this.processDone = '1';
          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
          this.showMessage.emit(status.data.message)
          this.otpmessage = status.data.message
        } else {
          this.processDone = '2';
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = false;
          this.otpError = true;
          this.otpmessage = status.data.message
        }
      });
  }
  // doSendDebitInstruction(value: any): void {
  //   this.makingFinalPayment = true;
  //   this.paymentHasBeenProcessed = false;
  //   this.payment_status = false;
  //   this.loading = true;
  //   this.operationsService.doSendDebitInstruction(this.currentUser.token, value, this.repayment)
  //     .subscribe(status => {
  //       this.loading = false;
  //       if (status.status == true) {

  //         this.paymentHasBeenProcessed = true;
  //         this.otpError = false;
  //         this.paymentConfirmed = true;
  //         this.payment_status = true;
  //       } else {
  //         this.makingFinalPayment = false;
  //         this.paymentHasBeenProcessed = false;
  //         this.showError(status.message);
  //       }



  //     });
  // }
  doCancelDebitInstruction(value: any): void {
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.payment_status = false;
    this.loading = true;
    this.operationsService.doCancelDirectDebit(this.currentUser.token, value, this.repayment)
      .subscribe(status => {
        this.loading = false;
        if (status.status == true) {

          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
          this.payment_status = true;
        } else {
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = false;
          this.showError(status.message);
        }



      });
  }
  doPaymentConfirmDebitAll(value: any): void {
    this.otpError = false;
    this.paytype = 'card_make';
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.payment_status = false;
    this.loading = true;
    this.operationsService.doPaymentConfirmDebitAll(this.currentUser.token, value, this.schedule_type, this.record_type, this.debit_all_card, this.disburse)
      .subscribe(status => {
        this.loading = false;
        if (status.status === 'success' || status.status === '1') {
          this.withdrawal_step = '2';
          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
          this.payment_status = true;
        } else {
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = false;
          //this.otpError = true;
          this.showError(status.message);
        }



      });
  }
  doPaymentConfirm(value: any): void {
    this.otpError = false;
    this.paytype = 'confirm';
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.payment_status = false;
    this.loading = true;
    this.operationsService.doPaymentConfirm(this.currentUser.token, value, this.schedule_type, this.record_type)
      .subscribe(status => {
        this.loading = false;
        if (this.record_type == '2') {
          this.withdrawal_step = '2';
          if (status.status == '1') {
            this.paymentHasBeenProcessed = true;
            this.otpError = false;
            this.paymentConfirmed = true;
            this.payment_status = true;
          } else {
            this.makingFinalPayment = false;
            this.paymentHasBeenProcessed = false;
            this.otpError = true;
          }
        } else {
          if (this.record_type == '3') {
            this.withdrawal_step = '2';
            if (status.status == '1') {
              this.paymentHasBeenProcessed = true;
              this.otpError = false;
              this.paymentConfirmed = true;
            } else {
              this.makingFinalPayment = false;
              this.paymentHasBeenProcessed = false;
              this.otpError = true;
            }
          } else {
            if (status.status) {
              this.paymentHasBeenProcessed = true;
              this.otpError = false;
              this.paymentConfirmed = true;
              this.payment_status = true;
            } else {
              this.makingFinalPayment = false;
              this.paymentHasBeenProcessed = false;
              this.otpError = true;
              this.otpmessage = status.message;
              this.showError(status.message);
            }
          }

        }



      });
  }
  doCustomerPaymentConfirm(value: any): void {
    this.otpError = false;
    this.paytype = 'confirm';
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true;
    this.operationsService.doCustomerPaymentConfirm(this.currentUser.token, value, this.schedule_type, this.record_type)
      .subscribe(status => {
        this.loading = false;
        if (this.record_type == '2') {
          this.withdrawal_step = '2';
          if (status.status == '1') {
            this.paymentHasBeenProcessed = true;
            this.otpError = false;
            this.paymentConfirmed = true;
          } else {
            this.makingFinalPayment = false;
            this.paymentHasBeenProcessed = false;
            this.otpError = true;
          }
        } else {
          if (this.record_type == '6') {
            this.withdrawal_step = '2';
            if (status.status == '1') {
              this.paymentHasBeenProcessed = true;
              this.otpError = false;
              this.paymentConfirmed = true;
            } else {
              this.makingFinalPayment = false;
              this.paymentHasBeenProcessed = false;
              this.otpError = true;
            }
          } else {
            if (status.status) {
              this.paymentHasBeenProcessed = true;
              this.otpError = false;
              this.paymentConfirmed = true;
            } else {
              this.makingFinalPayment = false;
              this.paymentHasBeenProcessed = false;
              this.otpError = true;
            }
          }

        }



      });
  }
  payInvestorWithBank(value: any): void {
    this.makingFinalPayment = true;
    this.loading = true;
    this.otpError = false;
    this.otpHBR = false;
    this.otp.CONFIRM_OTP_CODE = '';
    //console.log(value)
    this.operationsService.payInvestorWithBank(this.currentUser.token, value)
      .subscribe(status => {
        this.loading = false;
        if (status.status == true) {
          if (status.data.status == 'error') {
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
            this.inv_error = status.message;

          }
        } else {
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = true;
          this.paymentConfirmed = false;
          this.otpError = true;
        }
      });
  }
  payBorrowerWithBank(value: any): void {
    this.makingFinalPayment = true;
    this.loading = true;
    this.otpError = false;
    this.otpHBR = false;
    this.otp.CONFIRM_OTP_CODE = '';
    this.operationsService.payBorrowerWithBank(this.currentUser.token, value)
      .subscribe(status => {
        this.loading = false;
        if (status.status == true) {
          if (status.data.status == 'error') {
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
          if (status.data.status == 'error') {
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
  payment_status = true;
  confirmBorrowerHasBeenPaid(value: any): void {
    this.otpError = false;
    this.paytype = 'make';
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
          if (status.payment) {
            this.payment_status = true;
          } else {
            this.payment_status = false;
          }
        } else {
          this.paymentHasBeenProcessed = false;
          this.otpError = true;
          this.otpmessage = status.message
        }


      });
  }
  retryToPayBorrower() {

    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.payment_status = false;
    this.paytype = 'confirm';
    this.record_type = '1';
    this.schedule_type = '1';
    this.processDisbursement(this.disburse);


  }
  confirmwalletWithdrawalForm(value: any): void {
    this.otpError = false;
    this.paytype = 'make';
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true;
    this.operationsService.confirmWalletWithdrawal(this.currentUser.token, value)
      .subscribe(status => {
        this.loading = false;
        if (status.status == 'success') {
          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
        } else {
          this.otpmessage = status.message;
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = false;
          this.otpError = true;
          this.showError(status.message);
          console.log(status)
        }


      });
  }
  walletFundingComplete(value: any): void {
    this.otpError = false;
    this.paytype = 'make';
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true;
    this.operationsService.walletFundingComplete(this.currentUser.token, value)
      .subscribe(status => {
        this.loading = false;
        if (status.status == 'success') {
          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;
        } else {
          this.otpmessage = status.message
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

    this.confirmCardAD = false
  }
  addBorrowerAccount(disbursement) {

  }
  fundWalet() {
    this.DataService.onCancelPayment.emit(false);

  }
  processDisbursement(disburse) {

    this.disbursing = true;
    this.disbursement = disburse;
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
    if (this.record_type == '1' || this.record_type == '2' || this.record_type == '7' || this.record_type == '20' || this.record_type == '4') {
      this.operationsService.getWalletSummary(this.currentUser.token, disburse.HOW_MUCH_WAS_GIVEN)
        .subscribe(data => {
          this.wallet_balance = data.data.LENDER_WALLET_BALANCE;
          this.wallet_status = data.data.wallet_status;
        });
    }
    if (this.record_type == '6') {
      (<FormControl>this.customerrepaymentConfirmPayment.controls['LOAN_REPAYMENT_ID'])
        .setValue(this.disburse.LOAN_REPAYMENT_ID, { onlySelf: true });
      (<FormControl>this.customerrepaymentConfirmPayment.controls['REQUEST_ID'])
        .setValue(this.disburse.REQUEST_ID, { onlySelf: true });
      (<FormControl>this.customerrepaymentConfirmPayment.controls['PEOPLE_ID'])
        .setValue(this.disburse.PEOPLE_ID, { onlySelf: true });
    }
    if (this.record_type == '7') {
      (<FormControl>this.paymentConfirmRollbackForm.controls['ROLLBACK_ID'])
        .setValue(this.disburse.ROLLBACK_ID, { onlySelf: true });
      (<FormControl>this.customerrepaymentConfirmPayment.controls['REQUEST_ID'])
        .setValue(this.disburse.REQUEST_ID, { onlySelf: true });
      (<FormControl>this.customerrepaymentConfirmPayment.controls['PEOPLE_ID'])
        .setValue(this.disburse.PEOPLE_ID, { onlySelf: true });
    }
    if (this.record_type == '1' || this.record_type == '3' || this.record_type == '20') {

      (<FormControl>this.complexForm.controls['PAYMENT_QUEUE_ID'])
        .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });
      (<FormControl>this.debitAllForm.controls['PAYMENT_QUEUE_ID'])
        .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });
      (<FormControl>this.newAccountForm.controls['PAYMENT_QUEUE_ID'])
        .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });
      (<FormControl>this.repaymentConfirmPayment.controls['PAYMENT_QUEUE_ID'])
        .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });
    } else {
      if (this.record_type == '4') {
        (<FormControl>this.newAccountForm.controls['WALLET_WITHDRAWAL_REQUEST_ID'])
          .setValue(this.disburse.WALLET_WITHDRAWAL_REQUEST_ID, { onlySelf: true });
      } else {
        if (this.record_type == '5') {
          (<FormControl>this.walletFundingForm.controls['WALLET_WITHDRAWAL_REQUEST_ID'])
            .setValue(this.disburse.WALLET_WITHDRAWAL_REQUEST_ID, { onlySelf: true });
          (<FormControl>this.walletFundingConfimForm.controls['WALLET_WITHDRAWAL_REQUEST_ID'])
            .setValue(this.disburse.WALLET_WITHDRAWAL_REQUEST_ID, { onlySelf: true });
          (<FormControl>this.walletFundingForm.controls['DATE_ADDED'])
            .setValue(this.disburse.DATE_ADDED, { onlySelf: true });
          if (this.disburse.WALLET_FUNDING_FROM == '1') {
            this.paytype = 'confirm';
            (<FormControl>this.walletFundingForm.controls['LENDER_BANK_ACCOUNT_ID']).disable({ onlySelf: true });

          }
        } else {
          this.account_type = 'Investor Account';
          (<FormControl>this.complexForm.controls['INVESTMENT_QUEUE_ID'])
            .setValue(this.disburse.INVESTMENT_QUEUE_ID, { onlySelf: true });
          (<FormControl>this.debitAllForm.controls['INVESTMENT_QUEUE_ID'])
            .setValue(this.disburse.INVESTMENT_QUEUE_ID, { onlySelf: true });
          (<FormControl>this.newAccountForm.controls['INVESTMENT_QUEUE_ID'])
            .setValue(this.disburse.INVESTMENT_QUEUE_ID, { onlySelf: true });
          (<FormControl>this.investorConfirmPayment.controls['INVESTMENT_QUEUE_ID'])
            .setValue(this.disburse.INVESTMENT_QUEUE_ID, { onlySelf: true });
          (<FormControl>this.investorConfirmPayment_.controls['INVESTMENT_QUEUE_ID'])
            .setValue(this.disburse.INVESTMENT_QUEUE_ID, { onlySelf: true });


        }
      }

    }


    (<FormControl>this.complexForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    (<FormControl>this.debitAllForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    (<FormControl>this.repaymentConfirmPayment.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    (<FormControl>this.investorConfirmPayment.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    (<FormControl>this.investorConfirmPayment_.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    (<FormControl>this.newAccountForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });

    (<FormControl>this.complexForm.controls['REQUEST_ID'])
      .setValue(disburse.REQUEST_ID, { onlySelf: true });
    (<FormControl>this.complexForm.controls['REQUEST_ID'])
      .setValue(disburse.REQUEST_ID, { onlySelf: true });
    (<FormControl>this.debitAllForm.controls['REQUEST_ID'])
      .setValue(disburse.REQUEST_ID, { onlySelf: true });
    (<FormControl>this.debitAllForm.controls['REQUEST_ID'])
      .setValue(disburse.REQUEST_ID, { onlySelf: true });
    if (this.record_type == '1' || this.record_type == '3' || this.record_type == '20') {
      (<FormControl>this.newAccountForm.controls['REQUEST_ID'])
        .setValue(disburse.REQUEST_ID, { onlySelf: true });
      (<FormControl>this.bankPaymentForm.controls['PAYMENT_QUEUE_ID'])
        .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });

      (<FormControl>this.walletPaymentForm.controls['PAYMENT_QUEUE_ID'])
        .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });

      (<FormControl>this.repaymentConfirmPayment.controls['PAYMENT_QUEUE_ID'])
        .setValue(disburse.PAYMENT_QUEUE_ID, { onlySelf: true });
      (<FormControl>this.repaymentConfirmPayment.controls['REQUEST_ID'])
        .setValue(disburse.REQUEST_ID, { onlySelf: true });
    } else {
      (<FormControl>this.newAccountForm.controls['REQUEST_ID'])
        .setValue(disburse.REQUEST_ID, { onlySelf: true });
      (<FormControl>this.bankPaymentForm.controls['INVESTMENT_QUEUE_ID'])
        .setValue(this.disburse.INVESTMENT_QUEUE_ID, { onlySelf: true });

      (<FormControl>this.walletPaymentForm.controls['INVESTMENT_QUEUE_ID'])
        .setValue(this.disburse.INVESTMENT_QUEUE_ID, { onlySelf: true });
    }
    if (this.record_type == '4' || this.record_type == '5') {

      (<FormControl>this.walletWithdrawalForm.controls['WALLET_WITHDRAWAL_REQUEST_ID'])
        .setValue(disburse.WALLET_WITHDRAWAL_REQUEST_ID, { onlySelf: true });
      (<FormControl>this.walletFundingForm.controls['WALLET_WITHDRAWAL_REQUEST_ID'])
        .setValue(disburse.WALLET_WITHDRAWAL_REQUEST_ID, { onlySelf: true });
      (<FormControl>this.walletFundingConfimForm.controls['WALLET_WITHDRAWAL_REQUEST_ID'])
        .setValue(disburse.WALLET_WITHDRAWAL_REQUEST_ID, { onlySelf: true });
    }
    (<FormControl>this.walletPaymentForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    (<FormControl>this.walletWithdrawalForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    (<FormControl>this.walletFundingForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    (<FormControl>this.walletFundingConfimForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    if (this.record_type == '1' || this.record_type == '3') {
      (<FormControl>this.walletPaymentForm.controls['REQUEST_ID'])
        .setValue(disburse.REQUEST_ID, { onlySelf: true });
      (<FormControl>this.repaymentConfirmPayment.controls['REQUEST_ID'])
        .setValue(disburse.REQUEST_ID, { onlySelf: true });
    } else {
      (<FormControl>this.walletPaymentForm.controls['REQUEST_ID'])
        .setValue(disburse.INVESTMENT_ID, { onlySelf: true });
    }
    (<FormControl>this.bankPaymentForm.controls['CONNECTED_ACCOUNT_ID'])
      .setValue(this.disbursement.CONNECTED_ACCOUNT, { onlySelf: true });
    (<FormControl>this.bankPaymentForm.controls['PEOPLE_ID'])
      .setValue(disburse.PEOPLE_CUSTOMERS_ID, { onlySelf: true });
    if (this.record_type == '1' || this.record_type == '3') {
      (<FormControl>this.bankPaymentForm.controls['REQUEST_ID'])
        .setValue(disburse.REQUEST_ID, { onlySelf: true });
      (<FormControl>this.repaymentConfirmPayment.controls['REQUEST_ID'])
        .setValue(disburse.REQUEST_ID, { onlySelf: true });
    } else {
      (<FormControl>this.bankPaymentForm.controls['REQUEST_ID'])
        .setValue(disburse.INVESTMENT_ID, { onlySelf: true });
    }
    if (this.record_type == '2') {
      this.paytype = 'confirm';
    }
    if (this.record_type == '7') {
      this.paytype = 'confirm';
    }
    if (this.record_type == '20') {
      this.makingFinalPayment = true;
      this.paymentHasBeenProcessed = false;
      this.doPaymentTransactionConfirm(this.disburse)
    }
  }
  doPaymentTransactionConfirm(disburse) {
    this.loansService.checkWalletTStatus(this.currentUser.token, this.disburse.REQUEST_ID)
      .subscribe(loans => {
        this.loading = false;
        if (loans.status == 'success') {

          this.paymentHasBeenProcessed = true;
          if (loans.data.status == 'completed') {
            this.paymentConfirmed = true;
          } else {

            this.paymentConfirmed = false;

          }
        } else {
          this.paymentHasBeenProcessed = true;
          this.paymentConfirmed = false;
        }
      });
  }
  closeOverlay() {
    this.disbursing = false;
    this.closePaymentDialog.emit({})
  }
  closeModal() {
    this.DataService.onCancelPayment.emit(false);
    this.paymentHasBeenProcessedFinally.emit();
  }
  openSec(sec) {
    this.otherClosed = true;
    this.secOpen = sec;
  }
  getPaymentQueue() {
    console.log(this.pqueue_id)
  }
  processRepayment(repayment) {
    this.paytype = 'send_email';
    this.disbursing = true;
    this.repayment = repayment;
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
    (<FormControl>this.sendRepaymentLink.controls['REPAYMENT_SCHEDULE_ID'])
      .setValue(this.repayment.REPAYMENT_SCHEDULE_ID, { onlySelf: true });
    (<FormControl>this.sendRepaymentLink.controls['REQUEST_ID'])
      .setValue(this.repayment.REQUEST_ID, { onlySelf: true });
    (<FormControl>this.sendRepaymentLink.controls['LENDER_ID'])
      .setValue(this.repayment.LENDER_ID, { onlySelf: true });
    (<FormControl>this.sendRepaymentLink.controls['PEOPLE_ID'])
      .setValue(this.repayment.PEOPLE_ID, { onlySelf: true });
    this.operationsService.getRepaymentSchedule(this.currentUser.token, 8, 3, repayment.REPAYMENT_SCHEDULE_ID)
      .subscribe(result => {
        this.security_question = result.security_question.QUESTION;
        this.cards = result.cards;
        this.loan = result.loan
      });
  }
  ngOnInit() {
    this.getBanks();
    this.makingFinalPayment = false;
    this.paymentHasBeenProcessed = false;
    this.otpError = false;
    this.checkDirectDebitStatus();
  }
  checkDirectDebitStatus() {
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.payment_status = false;
    this.loading = true;
    this.operationsService.doCheckDirectDebitStatus(this.currentUser.token, this.repayment)
      .subscribe(status => {
        this.loading = false;
        this.paymentHasBeenProcessed = true;
        this.otpError = false;
        this.paymentConfirmed = true;
        this.payment_status = true;
        this.showSuccess(status.status)
      });
  }
  rejectRequest(event) {
    this.operationsService.cancelQueuedOperation(this.currentUser.token, event)
      .subscribe(result => {

      });
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
        this.banks = banks.banks;
      });
  }

  getBorrowerCards(disburse) {
    console.log(this.disburse)
    this.loansService.getLoanCards(this.currentUser.token, this.disburse.TOP_UP_REFERENCE)
      .subscribe(banks => {
        this.cards = banks.cards;
      });
  }
  setAsDebitAllCard(acc) {
    this.debit_all_card = acc;
  }
}
