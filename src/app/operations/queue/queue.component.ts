import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, DataService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  is_cancel='0';
  @Input('schedule_type') schedule_type = '1';
  @Input('record_type') record_type = '1';
  @Input('datechosen') datechosen: any;
  platformwallet:any;
  switcher = false;
  disburse: any;
  currentUser: any;
  state: any;
  subopen = '0';
  loading = false;
  public record_types = [
    { value: '1', display: 'Outgoing' },
    { value: '2', display: 'Incoming' }

  ];
  public record_types_ = [
    { value: '1', display: 'Loan Disbursements' },
    { value: '2', display: 'Investment Payment' },
    { value: '4', display: 'Wallet Withdrawal' },
    { value: '5', display: 'Wallet Funding' },
    { value: '7', display: 'Payment Rollback' },
  ];
  public record_types__ = [ 
    { value: '3', display: 'Queued Repayments' },
    // { value: '6', display: 'Customer Repayments' }
  ];
  magic_filter = { loan_status_active: true, loan_status_closed: false, searchText: '', ratings_one: false, ratings_two: false, ratings_three: false, ratings_four: false, ratings_five: false, funding_amount_one: 1, funding_amount_two: 1, funding_amount_three: false, funding_status_contract_created: false, funding_status_applied: false, funding_status_funded: false, funding_status: false, amount: false, approval_level: false, rating: false, sector: false, date: false };
  otherClosed = true;
  secOpen = '0';
  data: any;
  overlayOpen = false;
  searching = false;
  searchName = "";
  overlayWithdrawal = false;
  constructor(public router: Router,public authService:AuthenticationService,public toastr: ToastrService, vcr: ViewContainerRef,
    private DataService: DataService, public fb: FormBuilder, public operationsService: OperationsService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.DataService.onCancelPayment.subscribe(res => {
      this.overlayOpen = false
    }) 
    if(!authService.canViewModule('1,3,5')){
      this.router.navigate(['../unauthorized']);
    }
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  ngOnInit() {
    this.is_cancel='0';
    this.getRecords();
    this.getBanks();
    this.getSecurityQuestion();
    this.operationsService.getWalletData(this.currentUser.token)
      .subscribe(data => { 
        this.account_details = data.account_details;
        this.ledger = data;
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

  searchRecords() {
    this.operationsService.getQueuedRecords(this.currentUser.token, this.record_type, this.schedule_type, this.searchName)
      .subscribe(data => {
        this.state = data;
      });
  }
  openSec(sec) {
    this.otherClosed = true;
    this.secOpen = sec;
  }
  getRecords() {
    this.operationsService.getQueuedRecords(this.currentUser.token, this.record_type, this.schedule_type, this.searchName)
      .subscribe(data => {
        this.state = data;
        this.platformwallet = data.platform_wallet;
      });
  }
  getHistoricalRecords() {
    this.operationsService.getHistoricalQueuedRecords(this.currentUser.token, this.record_type, this.schedule_type, this.searchName)
      .subscribe(data => {
        this.state = data;
      });
  }
  onChange(event) {
    if (event == true) {
      this.schedule_type = '2';
      this.record_type = '3'
    }
    if (event == false) {
      this.schedule_type = '1';
      this.record_type = '1'
    }
    this.searchName = ""
    this.getRecords();
  }
  reloadrecord_(event) {
    this.record_type = event;
    this.searchName = ""
    this.getRecords();
  }
  reloadrecord(event) {
    this.schedule_type = event.target.value;
    if (event.target.value == '2') {
      this.record_type = '3'
    }
    if (event.target.value == '1') {
      this.record_type = '1'
    }
    this.searchName = ""
    this.getRecords();
  }
  processDisbursement(disburse) {
    this.overlayOpen = true;
    this.disburse = disburse;
    this.is_cancel = "0";
  }
  cancelQueue(disburse) {
    this.overlayOpen = true;
    this.disburse = disburse;
    this.is_cancel='1';
  }
  showMessage(event){
    if(event.status==true){
      this.showSuccess(event.data.message)
    }
    if(event.status==false){
      this.showError(event.data.message)
    }
  }
  processWalletTransfer(disburse) {
    this.overlayWithdrawal = true;
    this.disburse = disburse;
  }
  closeOverlay() {
    this.overlayOpen = false;
    this.getRecords();
    this.is_cancel='0'
  }
  otpError = false;
  makingFinalPayment = false;
  paymentHasBeenProcessed = false;
  paymentConfirmed = false;
  security_question = "";
  account_details: any;
  ledger: any;
  banks: any;
  api_message = "";
}
