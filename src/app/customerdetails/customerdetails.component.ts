import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, OperationsService,StorageService,CustomerService, AuthenticationService } from '../_services/index';
import { CustomersService } from '../_services/customers.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {
  userType;
  userId;
  section = { location: '', data: {} };
  transactions: any;
  overlayOpen = false;
  overlayOpenLedger = false;
  currentUser: any;
  account_details: any;
  ledger: any;
  enable_peer='0';
  deleteCustomer = false;
  loading=false;
  is_done = false;
  resendCustomerEmail=false;
  prev: any;
  next: any;
  nce:any;
  canSeeLinks=false;
  constructor(protected customersSrvc: CustomersService,public router: Router,
    public customerServ:CustomerService,public storageService:StorageService,public operationsService: OperationsService, 
    public route: ActivatedRoute, public DataService: DataService, public authService: AuthenticationService ) {
      if(!authService.canViewModule('1,4,5')){
        this.canSeeLinks = true;
      }
    this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
    // Subscribe to the Event that is being emitted on navigation on the profile page.
    // The appropriate side card is loaded based on the section navigated to.
    this.DataService.onProfileNav.subscribe(res => {
      this.section = res;
      console.log(res)
    })
    this.DataService.onScheduleNav.subscribe(res => {
      this.section = res;
    })
    this.DataService.onOpenLedger.subscribe(res => {

      this.ledger = res.ledger;
      this.account_details = res.account_details;
      this.transactions = res.transactions;
      this.calculateTotal(this.ledger.chart_account_transactions, this.ledger.contra_charts_size)
      this.overlayOpen = true
    })
    this.DataService.onDeleteCustomer.subscribe(res => {
      this.loading=false;
      this.is_done=false;
      this.overlayOpen = false
      this.deleteCustomer = true;
    })
    this.DataService.resendWelcomeMail.subscribe(res => {
      this.overlayOpen = false
      this.deleteCustomer = false;
      this.resendCustomerEmail = true;
      this.loading=false;
      this.is_done=false;
    })
    this.DataService.addNewCustomerEmployee.subscribe(res => {
      this.overlayOpen = false
      this.nce = res;
    })
    this.DataService.onOpenCustomerStatement.subscribe(res => {
      this.account_details = res; 
      this.overlayOpenLedger = true;
    })
    this.currentUser = this.storageService.read<any>('currentUser');
  }
  reloadrecord($event) {

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
        //this.state = data;
        this.account_details = data.account_details;
        this.ledger = data;
        this.calculateTotal(data.chart_account_transactions, data.contra_charts_size)
      });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getNextPrev(this.userId).subscribe(data => {
        
        this.next = data.next; 
        this.prev = data.prev;
      });
    });
  }
  closeOverlay() {
    this.overlayOpen = false;
    this.deleteCustomer = false;
    this.resendCustomerEmail = false;
  }
  deleteBorrower(){
    this.loading = true;
    this.customerServ.deleteBorrower(this.currentUser.token, this.userId)
    .subscribe(data => {
      this.loading=false;
      this.is_done=true;
      this.router.navigate(['/crm/customers']);
    });
  }
  sendMail(){

    this.loading = true;
    this.customerServ.resendWelcomeEmail(this.currentUser.token, this.userId)
    .subscribe(data => {
      this.loading=false;
      this.is_done=true;
    });

  }
  // saveEmployeeCompany() { 
  //   this.nce.loading = true; 
  //   this.operationsService.saveEmployeeCompany(this.currentUser.token, this.nce.employee, this.nce.employee, this.nce.isedit,this.nce.roles)
  //     .subscribe(status => {
  //       this.nce.loading = false;
  //       this.closeOverlay();
  //     });
  // }
}
