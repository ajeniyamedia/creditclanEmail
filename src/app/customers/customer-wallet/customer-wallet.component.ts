import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { DataService } from '../../_services/index';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';
@Component({
  selector: 'app-customer-wallet',
  templateUrl: './customer-wallet.component.html',
  styleUrls: ['./customer-wallet.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CustomerWalletComponent implements OnInit {

  trans = [];
  sub; // Instance of the route subscription
  userType; // Type of user
  userId; // User Id
  state: any;
  transactions: any;
  overlayOpen = false;
  currentUser: any;
  account_details: any;
  ledger: any;
  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService,
    public operationsService: OperationsService
    , public storageService: StorageService) { this.currentUser = this.storageService.read<any>('currentUser'); }

  // Load the basic information on navigation to this page
  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getCustomerProfile(this.userType, this.userId).subscribe(data => {
        this.trans = data.trans;

        // Publish section

        this.getRecords();

      });
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
  handledateChanged(event) {
    let datas = {
      "FISCAL_DATE_END": event.FISCAL_DATE_END,
      "FISCAL_DATE_START": event.FISCAL_DATE_START,
      "type": 3,
      "LENDER_ACCOUNT_ID": event.LENDER_ACCOUNT_ID,
      "IS_MIGRATED": 0
    }
    this.operationsService.getCustomerWalletData(this.currentUser.token, 0, 0, this.userId)
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
    this.operationsService.getCustomerWalletData(this.currentUser.token, 0, 0, this.userId)
      .subscribe(data => {
        this.state = data;
        this.account_details = data.account_details;
        this.ledger = data;
        this.calculateTotal(data.chart_account_transactions, data.contra_charts_size)
        this.DataService.onProfileNav.emit({ 'location': 'profile', 'data': data, 'ledger': this.ledger });
      });
  }
  openWalletStatement() {
    this.DataService.onOpenLedger.emit({ 'account_details': this.account_details, 'transactions': this.transactions, 'ledger': this.ledger });
  }
}
