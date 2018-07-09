import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
  public currentUser: any;
  public loading = false;
  public banks = {
    count:'0',
    banks:[]
  };
  public showForm = false;
  public showSearch = false;
  public nigerian_banks: any;
  public VERIFY_STATUS = false;
  public charge_account = false;
  public destination = false;
  public bank = { LENDER_BANK_BANK_NAME: '', LENDER_BANK_ACCOUNT_NAME: '', LENDER_BANK_CODE: '', LENDER_BANK_ACCOUNT_ID: '', LENDER_ACCOUNT_NUMBER: '', LENDER_BANK_ID: '', LENDER_ACCOUNT_GL: '', LENDER_ID: '', ADDED_BY: '', DATE_ADDED: '', PARENT_GL_ID: '', DATE_MODIFIED: '',IS_FOR_EBILLS: false };
  public credit = { DEST_BANK_ID: '', DEST_BANK_CODE: '', DEST_ACCOUNT_NUMBER: '' };
  public otp = { CONFIRM_OTP_CODE: '', flutterChargeReference: '' };
  public fresponse;
  public confirming = true;
  public otpConfirmed = false;
  public otpHBSFC = false;
  public confirmingOTP = true;
  public lenderbanksaved = false;
  public lbHBSFS = false;
  overlayOpen = false;
  overlayWithdrawal = false;
  has_ebills_error = false;
  ebills_error="";
  account_details: any;
  ledger: any;
  transactions: any;
  constructor(public toastr: ToastrService, vcr: ViewContainerRef,public fb: FormBuilder, public operationsService: OperationsService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.operationsService.getNigerianBanks(this.currentUser.token).subscribe(nigerian_banks => this.nigerian_banks = nigerian_banks);
 
  }

  closeOverlay() {
    this.overlayOpen = false;
  }
  view_statement(data) {
    console.log(data)
    this.account_details = data.account_details;
    this.ledger = data;
    this.calculateTotal(data.chart_account_transactions, data.contra_charts_size)
    this.overlayOpen = true;
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  handledateChanged(event) {
    let datas = {
      "FISCAL_DATE_END": event.FISCAL_DATE_END,
      "FISCAL_DATE_START": event.FISCAL_DATE_START,
      "type": 3,
      "LENDER_ACCOUNT_ID": event.LENDER_ACCOUNT_ID,
      "IS_MIGRATED": 0
    }
    this.operationsService.getLeafAccountBalance(this.currentUser.token, datas)
      .subscribe(data => {
        ///this.state = data;
        this.account_details = data.account_details;
        this.ledger = data;
        this.calculateTotal(data.chart_account_transactions, data.contra_charts_size)
      });
  }
  calculateTotal(chart_account_transactions, contra_charts_size) {
    if (contra_charts_size > 0) {
      let bal = chart_account_transactions[0]["DEBIT"];
      bal = bal - chart_account_transactions[0]["CREDIT"];
      chart_account_transactions.map(function(element) {
        element["BALANCE"] = bal
        bal = bal + element["DEBIT"];
        bal = bal - element["CREDIT"];
        //this.transactions.push(element)
      });
      this.transactions = chart_account_transactions
    }
  }
  deleteBank(bank){
    this.loading = true; 
    this.operationsService.deleteBank(this.currentUser.token, bank)
      .subscribe(status => {
        
        this.loading = false;

        if (status.status == '1') { 
          this.showError(status.message)
        } else { 
          this.showError(status.message)
        }
        this.getBanks();
      });
  }
  saveLenderBank() {

    this.loading = true; 
    this.operationsService.saveLenderBank(this.currentUser.token, this.bank)
      .subscribe(status => {
        this.lbHBSFS = true; 
        this.loading = false;

        if (status.status == '1') {
          this.lenderbanksaved = true;
          this.loading = false;
          this.confirming = true;
          this.confirmingOTP = false;
          this.otpConfirmed = false
          this.otpHBSFC = false
          this.lenderbanksaved = false;
          this.lbHBSFS = false;
          this.showForm = false;
          this.getBanks()
          this.showError(status.message)
        } else {
          this.lenderbanksaved = false;
          this.showError(status.message)
        }
      });
  }
  cancelOperation() {
    this.loading = false;
    this.confirming = true;
    this.confirmingOTP = false;
    this.otpConfirmed = false
    this.otpHBSFC = false
    this.lenderbanksaved = false;
    this.lbHBSFS = false;
  }
  confirmOTPForTransfer() {
    this.loading = true; 
    this.operationsService.confirmOTPForTransfer(this.currentUser.token, this.otp)
      .subscribe(status => { 
        this.loading = false;
        this.otpHBSFC = true;
        if (status.status == true) {
          if (status.data.status == "error") {
            this.otpConfirmed = false;
          } else {
            this.otpConfirmed = true;
          }
        } else {
          this.VERIFY_STATUS = true;
        }
      });
  }



  doTransfer() {
    this.loading = true; 
    this.operationsService.accountToAccount(this.currentUser.token, this.bank, this.credit)
      .subscribe(status => { 
        this.loading = false;
        if (status.status == true) {
          if (status.data.status == "error") {
            this.VERIFY_STATUS = true;
          } else {
            this.otp.flutterChargeReference = status.data.data.transfer.flutterChargeReference;
            let authparams_data = status.data.data.authparams[0]
            this.fresponse = authparams_data.description;
            this.confirming = false;
            this.confirmingOTP = true;
            this.otpConfirmed = false
          }
        } else {
          this.VERIFY_STATUS = true;
        }
      });
  }
  verifyAccount(bank) {
    this.bank = bank;
    this.loading = true;
    this.VERIFY_STATUS = false; 
    this.operationsService.confirmBankAccount(this.currentUser.token, this.bank)
      .subscribe(status => { 
        this.loading = false;

        if (status.status == "success") {
          this.VERIFY_STATUS = false;
          this.charge_account = true;
          this.bank.LENDER_BANK_ACCOUNT_NAME = status.data.account_name;
        } else {
          this.VERIFY_STATUS = true;
        }
      });
  }

  testTransfer() {
    this.loading = false;
    this.charge_account = false;
    this.VERIFY_STATUS = false;
    this.destination = true;
  }
  changeBankCode(event) {
    if (event.status == true) {
      this.charge_account = false;
      this.VERIFY_STATUS = false;
      this.loading = false;
      this.destination = false;
      this.bank.LENDER_BANK_CODE = event.event.BANK_CODE;
      this.bank.LENDER_BANK_BANK_NAME = event.event.BANK_NAME;
      this.bank.LENDER_BANK_ID = event.event.BANK_ID;
      this.bank.LENDER_BANK_ACCOUNT_NAME = "";
      this.bank.LENDER_ACCOUNT_NUMBER = "";
    } else {
      this.charge_account = false;
      this.VERIFY_STATUS = false;
      this.loading = false;
      this.credit.DEST_BANK_CODE = event.event.BANK_CODE;
    }

  }
  changeBankCode_(event) {
   
    this.charge_account = false;
      this.VERIFY_STATUS = false;
      this.loading = false;
      this.credit.DEST_BANK_CODE = event.event.BANK_CODE; 
  }
  updateBankDetails(bank) {
    this.showForm = true;
    this.bank = bank;
  }
  addNewBank() {
    this.showForm = true;
    console.log(this.nigerian_banks)
  }
  ngOnInit() {
    this.getBanks();

  }
  closeModal() {
    this.showForm = false;
  } 
  getBanks() {
    this.operationsService.getBanks_(this.currentUser.token)
      .subscribe(banks => { 
        this.banks = banks;
        this.loading = false;
      });
  }
  checkIfEbillsBankAlreadyExists(){
    this.ebills_error = "";
    this.has_ebills_error = false;
    this.operationsService.checkIfEbillsBankAlreadyExists(this.currentUser.token)
      .subscribe(result => {
        if(result.status == "success"){
          if(result.data.status == true){
            this.has_ebills_error = true;
            this.ebills_error = "This will override an already existing account set for ebills transfer";
          }else{
            this.ebills_error = "";
            this.has_ebills_error = false;
          }
        }
      });
  }
}
