import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { DataService, StorageService } from '../../_services/index';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer-account-settings',
  templateUrl: './customer-account-settings.component.html',
  styleUrls: ['./customer-account-settings.component.css']
})
export class CustomerAccountSettingsComponent implements OnInit {
  public loading = false;
  public userussd = {
    PEOPLE_CUSTOMERS_ID: '0',
    MAX_AMOUNT: '0'
  }
  public usersuspend = {
    PEOPLE_CUSTOMERS_ID: '0',
    TPDATE: '',
    IS_SUSPENDED:false
  }
  public userexclude = {
    PEOPLE_CUSTOMERS_ID: '0',
    TPDATE: '',
    EXCLUDE_FROM_ELIGIBILITY:false
  }
  public userratings = {
    PEOPLE_CUSTOMERS_ID: '0',
    PEOPLE_RATING_ID: '0'
  }
  public request_limit = {
    MIN_REQUEST_AMOUNT: '0',
    MAX_REQUEST_AMOUNT: '0',
    MIN_REQUEST_DURATION: '0',
    MAX_REQUEST_DURATION: '0',
    PEOPLE_CUSTOMERS_ID: '0',
  }
  cust = []; // Customer Information
  sub; // Instance of the route subscription
  userType; // Type of user
  userId; // User Id
  preloading = false;
  cust_meta = {};
  enable_peer = '0';
  currentUser: any;
  constructor(public toastr: ToastrService, vcr: ViewContainerRef, public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService,
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
  }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"]; 
      console.log(this.userId)
      this.customersSrvc.getCustomerSettings(this.userId, this.currentUser.token).subscribe(data => {

        this.userussd.MAX_AMOUNT = data.ussd.MAX_AMOUNT;
        this.userussd.PEOPLE_CUSTOMERS_ID = data.ussd.PEOPLE_CUSTOMERS_ID;
        this.userratings.PEOPLE_RATING_ID = data.userratings.PEOPLE_RATING_ID;
        this.userratings.PEOPLE_CUSTOMERS_ID = data.userratings.PEOPLE_CUSTOMERS_ID;
        this.statement_account_details = data.accounts.wallet;
        this.loan_statement_details = data.accounts.loan;
        this.investment_account_details = data.accounts.investment;
        this.usersuspend.PEOPLE_CUSTOMERS_ID = data.ussd.PEOPLE_CUSTOMERS_ID;
        this.usersuspend.IS_SUSPENDED = data.usersuspend.IS_SUSPENDED;
        this.usersuspend.TPDATE = data.usersuspend.TPDATE;
        this.userexclude.PEOPLE_CUSTOMERS_ID = data.userexclude.PEOPLE_CUSTOMERS_ID;
        this.userexclude.EXCLUDE_FROM_ELIGIBILITY = data.userexclude.EXCLUDE_FROM_ELIGIBILITY;

        this.request_limit.PEOPLE_CUSTOMERS_ID = data.request_limit.PEOPLE_CUSTOMERS_ID;
        this.request_limit.MIN_REQUEST_AMOUNT = data.request_limit.MIN_REQUEST_AMOUNT;
        this.request_limit.MAX_REQUEST_AMOUNT = data.request_limit.MAX_REQUEST_AMOUNT;
        this.request_limit.MIN_REQUEST_DURATION = data.request_limit.MIN_REQUEST_DURATION; 
        this.request_limit.MAX_REQUEST_DURATION = data.request_limit.MAX_REQUEST_DURATION;

      });
    });
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  saveUSSD(value, valid) {
    this.loading = true;
    this.customersSrvc.saveUSSD(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveRequestLimit(value, valid) {
    this.loading = true;
    this.customersSrvc.saveRequestLimit(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  suspendCustomer(value, valid) {
    this.loading = true;
    this.customersSrvc.suspendCustomer(this.currentUser.token, value, this.usersuspend.PEOPLE_CUSTOMERS_ID)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  excludeCustomer(value, valid) {
    this.loading = true;
    this.customersSrvc.excludeCustomer(this.currentUser.token, value, this.userexclude.PEOPLE_CUSTOMERS_ID)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  saveUserRatings(value, valid) {
    this.loading = true;
    this.customersSrvc.saveUserRatings(this.currentUser.token, value, this.userId)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  overlayOpen = false;
  statement_account_details: any;
  loan_statement_details: any;
  investment_account_details: any;
  account_details: any;
  ledger:any;
  generate_statement_account(type_of_account) {
    if (type_of_account === "1") {
      this.account_details = this.statement_account_details;
    }
    if (type_of_account === "3") {
      this.account_details = this.loan_statement_details;
    }
    if (type_of_account === "4") {
      this.account_details = this.investment_account_details;
    }
    //this.ledger = data;
    // this.calculateTotal(data.chart_account_transactions, data.contra_charts_size)
    //this.overlayOpen = true
    this.DataService.onOpenCustomerStatement.emit(this.account_details);
  }
  handledateChanged(event) {

  }
}
