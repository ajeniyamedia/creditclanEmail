import { Component, OnInit, Input, Output } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, DataService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-customerwallet',
  templateUrl: './customerwallet.component.html',
  styleUrls: ['./customerwallet.component.css']
})
export class CustomerwalletComponent implements OnInit {
  currentUser: any;
  state: any;
  subopen = '0';
  loading = false;
  otherClosed = true;
  secOpen = '0';
  data: any;
  overlayOpen = false;
  search = "";
  start = "0";
  otpError = false;
  makingFinalPayment = false;
  paymentHasBeenProcessed = false;
  paymentConfirmed = false;
  security_question = "";
  account_details: any;
  ledger: any;
  banks: any;
  api_message = "";
  transactions: any;
  fundingQueued = false;
  overlayWithdrawal = false;
  cu = 0;
  ttype = '1';
  constructor(private DataService: DataService, public fb: FormBuilder, public operationsService: OperationsService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.DataService.onCancelPayment.subscribe(res => {
      this.overlayOpen = false
    })
  }
  searchRecords(){
    this.getRecords();
  }
  searching=false; 
  ngOnInit() {
    this.getRecords();
    this.getBanks();
    this.getSecurityQuestion()
  }
  getBanks() {
    this.operationsService.getBanks(this.currentUser.token)
      .subscribe(banks => {

        this.banks = banks.banks;
      });
  }
  load_more_records(start) {
    this.start = start;
    this.getRecords();
  }
  getSecurityQuestion() {
    this.operationsService.getSecurityQuestion(this.currentUser.token)
      .subscribe(data => {

        this.security_question = data.security_question.QUESTION;
      });
  }
  openSec(sec) {
    this.otherClosed = true;
    this.secOpen = sec;
  }
  getRecords() {
    this.operationsService.getCustomerWallets(this.currentUser.token, this.search, this.start)
      .subscribe(data => {
        this.state = data;
      });
    this.operationsService.getWalletData(this.currentUser.token)
      .subscribe(data => {
        this.ledger = data;

      });
  }
  view_statement(data) {
    this.account_details = data.account_details;
    this.ledger = data;
    this.calculateTotal(data.chart_account_transactions, data.contra_charts_size)
    this.overlayOpen = true
  }
  fundwallet(data) {
    this.account_details = data;
    //this.ledger=data.ledger;
    this.cu = data.ledger.cu;
    this.overlayWithdrawal = true;
    this.ttype = '1'
    this.loading = false;
    this.fundingQueued = false;
  }
  withdraw(data) {
    this.account_details = data;
    //this.ledger=data.ledger;
    this.cu = data.ledger.cu;
    this.overlayWithdrawal = true;
    this.ttype = '2';
    this.loading = false;
    this.fundingQueued = false;
  }
  doQueueFuning(event) {
    this.loading = true;
    this.operationsService.doQueueFunding(this.currentUser.token, event, this.account_details.CUSTOMER_ID, this.ttype)
      .subscribe(status => {
        this.loading = false;
        this.fundingQueued = true;
        

      });
  }
  doInitiateFuning(event) {
    this.loading = true;
    this.otpError = false;

    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true;
    this.operationsService.doInitiateFuning(this.currentUser.token, event, this.account_details.CUSTOMER_ID)
      .subscribe(status => {
        this.loading = false;
        if (status.status == "error" || status.status == false) {
          this.makingFinalPayment = false;
          this.paymentHasBeenProcessed = false;
          this.otpError = true;
          this.api_message = status.message
        } else {
          this.paymentHasBeenProcessed = true;
          this.otpError = false;
          this.paymentConfirmed = true;

        }


      });
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
}
