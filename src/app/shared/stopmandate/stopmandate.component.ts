import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService, UserService, OperationsService, AuthenticationService, StorageService, LoansService } from '../../_services/index';
import { FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var swal: any;

@Component({
  selector: 'app-stopmandate',
  templateUrl: './stopmandate.component.html',
  styleUrls: ['./stopmandate.component.css']
})
export class StopmandateComponent implements OnInit {

  confirmCardAD = false;
  loan: any;
  cards: any;
  debit_all_card: any;
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
   
  processDone = '0';
  amount_debited = 0;
   
   
  doCancelDebitMandate(value: any): void {
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
   
  payment_status = true;
   
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

    if (this.autodebit == '1') {
      if (this.repayment) {

        this.processRepayment(this.repayment);

      }
    }
    else {
      if (this.sub != '0') {

        if (this.disburse) {
          this.processDisbursement(this.disburse);

          if (this.record_type == '1' || this.record_type == '20') {
            this.payment_type = 'Disbursement';
            if (this.disburse.IS_TOP_UP == '7' || this.disburse.IS_TOP_UP == '6') {

              this.payment_type = 'Rollover';
              this.paytype = 'confirm'
              this.getBorrowerCards(this.disburse);
            }

            if (this.disburse.IS_TOP_UP == '8') {
              this.payment_type = 'Top Up';
            }
            if (this.disburse.IS_TOP_UP == '6') {

              this.payment_type = 'Pay Loan Balance';
              this.paytype = 'confirm'
            }
          }
          if (this.record_type == '3') {
            this.payment_type = 'Loan Repayment';
            this.paytype = 'confirm';

            this.getBorrowerCards(this.disburse);
          }
        } else {

        }
      }
      else {
         
      }
    } 
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

