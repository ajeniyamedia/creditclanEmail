import { Component, OnInit, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
import { Router } from '@angular/router';
// import { ModalService } from '../_services/index';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {


  currentUser: any;
  state: any;
  secOpen = '0';
  transactions: any;
  paytype = "make";
  data: any;
  overlayOpen = false;
  overlayWithdrawal = false;
  otpError = false;
  makingFinalPayment = false;
  paymentHasBeenProcessed = false;
  paymentConfirmed = false;
  security_question = "";
  loading = false;
  account_details: any;
  ledger: any;
  banks: any;
  api_message = "";
  fundPlatformWallet=false;
  lender_banks:any;
  otpSent=false;
  otpMessage='';
  withdrawalDone=false;
  fundingQueued=false;
  dashboarddata:any;

  constructor(public fb: FormBuilder, public router: Router, public operationsService: OperationsService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.getRecords();
    this.getBanks();
    this.getSecurityQuestion();
    this.getLenderBanks();
    this.loading = true;
    
    // this.operationsService.refreshData(this.currentUser.token).subscribe(data => {
    //   this.loading = false;
    //   this.dashboarddata = data
    // });
  }
  getLenderBanks(){
    this.operationsService.getBanks_(this.currentUser.token)
      .subscribe(banks => { 
        this.lender_banks = banks; 
      });
  }
  getBanks() {
    this.operationsService.getBanks(this.currentUser.token)
      .subscribe(banks => {

        this.banks = banks.banks;
      });
  }
  getSecurityQuestion() {
    this.operationsService.getSecurityQuestion(this.currentUser.token)
      .subscribe(data => {

        this.security_question = data.security_question.QUESTION;
      });
  }
  doWalletTransfer(event) {
    this.loading = true;
    this.otpError = false;
    this.paytype = "make";
    this.makingFinalPayment = true;
    this.paymentHasBeenProcessed = false;
    this.loading = true;
    this.operationsService.doWalletTransfer(this.currentUser.token, event)
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
  openWalletStatement() {
    this.overlayOpen = true
  }
  closeOverlay() {
    this.overlayOpen = false;
  }
  withdrawFromWallet() {
    this.overlayOpen = true;
  }
  handledateChanged(event) {
    let datas = {
      "FISCAL_DATE_END": event.FISCAL_DATE_END,
      "FISCAL_DATE_START": event.FISCAL_DATE_START,
      "type": 3,
      "LENDER_ACCOUNT_ID": event.LENDER_ACCOUNT_ID,
      "IS_MIGRATED": 0
    }
    this.operationsService.getWalletData_(this.currentUser.token, datas)
      .subscribe(data => {
        this.state = data;
        this.account_details = data.account_details;
        this.ledger = data;
        this.calculateTotal(data.chart_account_transactions, data.contra_charts_size)
      });
  }
  // openModal(id: string){
  //   console.log(id)
  //     this.modalService.open(id);
  // } 
  getRecords() {
    this.operationsService.getWalletSummary(this.currentUser.token)
      .subscribe(data => {
        this.loading = false;
        this.state = data.data;
        this.account_details = data.account_details;
        this.ledger = data.data;
      });
  }
  back() {
    this.router.navigate(['../operations']);
  }
  doInitiateWithdrawal(event){
    this.loading = true;
    this.operationsService.doInitiateWithdrawal(this.currentUser.token,event)
      .subscribe(data => {
        if(data.status==true){
          this.loading = false;
          this.otpSent = true;
          this.otpMessage = data.data.message
        }else{

        }
      });
  }
  confirmWithdrawal(event){
    this.fundingQueued = true;
    this.operationsService.doConfirmWithdrawal(this.currentUser.token,event)
      .subscribe(data => {
        this.fundingQueued=true
        if(data.status=='success'){
          this.withdrawalDone = true;
        }else{
          if(data.data.responsecode){
            if(data.data.responsecode=="RR"){
              this.fundingQueued = false;
              this.otpMessage = data.data.message
            }else{
              this.withdrawalDone=false
            }
          }else{
            this.withdrawalDone=false
          }
          
        }
      });
  }
}
