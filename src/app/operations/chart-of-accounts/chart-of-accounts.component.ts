import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.css']
})
export class ChartOfAccountsComponent implements OnInit {

  public currentUser: any;
  public loading = false;
  public accounts: any;
  public showForm = false;
  public showSearch = false;
  public nigerian_banks: any;
  public VERIFY_STATUS = false;
  public charge_account = false;
  public destination = false;
  public account = { GL_PARENT: '', GL_NAME: '', GL_CATEGORY: '0', GL_TYPE: '0' };
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
  account_details: any;
  ledger: any;
  transactions: any;
  start = 0;
  search = "";
  type = "0"
  state: any;
  public types = [
    { value: '0', display: 'All' },
    { value: '1', display: 'Assets' },
    { value: '2', display: 'Liability' },
    { value: '3', display: 'Capital' },
    { value: '4', display: 'Income' },
    { value: '5', display: 'Expenses' }
  ];
  public parents: any;
  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.operationsService.getNigerianBanks(this.currentUser.token).subscribe(nigerian_banks => this.nigerian_banks = nigerian_banks);

  }

  closeOverlay() {
    this.overlayOpen = false
  }
  view_statement(data){
    this.account_details = data;
    this.ledger = data; 
    this.overlayOpen = true;
  }
  // handledateChanged(event){
  //   let datas = {"FISCAL_DATE_END":event.FISCAL_DATE_END,
  //     "FISCAL_DATE_START":event.FISCAL_DATE_START,
  //     "type":3,
  //     "LENDER_ACCOUNT_ID":event.LENDER_ACCOUNT_ID,
  //     "IS_MIGRATED":0}
  //     this.operationsService.getLeafAccountBalance(this.currentUser.token,datas)
  //     .subscribe(data => {
  //      ///this.state = data;
  //      this.account_details = data.account_details;
  //      this.ledger = data;
  //      this.calculateTotal(data.chart_account_transactions,data.contra_charts_size)
  //     });
  // }
  // calculateTotal(chart_account_transactions,contra_charts_size){
  //   if(contra_charts_size>0){
  //     let bal = chart_account_transactions[0]["DEBIT"]; 
  //     bal=bal-chart_account_transactions[0]["CREDIT"];
  //     chart_account_transactions.map(function (element) {
  //       element["BALANCE"]=bal
  //       bal =bal+element["DEBIT"]; 
  //       bal=bal-element["CREDIT"];
  //       //this.transactions.push(element)
  //     });
  //     this.transactions=chart_account_transactions
  //   }
  // }
  saveLenderAccount() {

    this.loading = true;
    this.operationsService.saveLenderAccount(this.currentUser.token, this.account)
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
          this.getAccounts()
          this.overlayWithdrawal = false;
        } else {
          this.lenderbanksaved = false;
        }
      });
  }


  updateBankDetails(account) {
    this.showForm = true;
    this.account = account;
  }
  ngOnInit() {
    this.getAccounts();

  }
  closeModal() {
    this.showForm = false;
  }
  getAccounts() {
    this.operationsService.getAccounts(this.currentUser.token, this.start, this.search, this.type)
      .subscribe(accounts => {
        this.accounts = accounts.accounts;
        this.state = accounts
        this.parents = accounts.parents
        this.loading = false;
      });
  }
  getAccounts_() {
    this.start = 0;
    this.getAccounts();
  }
  loadNext(start) {
    this.start = start
    this.getAccounts();
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
      chart_account_transactions.map(function (element) {
        element["BALANCE"] = bal
        bal = bal + element["DEBIT"];
        bal = bal - element["CREDIT"];
        //this.transactions.push(element)
      });
      this.transactions = chart_account_transactions
    }
  }
}
