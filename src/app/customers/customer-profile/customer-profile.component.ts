import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { DataService,StorageService } from '../../_services/index';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CustomerProfileComponent implements OnInit {

  cust:any; // Customer Information
  sub; // Instance of the route subscription
  userType; // Type of user
  userId; // User Id
  preloading = false;
  cust_meta = {};
  enable_peer='0';
  customer:any;
  constructor(public route: ActivatedRoute,
    public DataService: DataService,
    protected customersSrvc: CustomersService,
    public storageService: StorageService) { 
      this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
      this.DataService.reloadCustomer.subscribe(res => {
        this.userType = "individual";
        this.userId = res;
        this.loadCustomer()
      })
    }
  showresendemail = false;
  // Load the basic information on navigation to this page
  ngOnInit() {
    this.loadCustomer()
  }
  loadCustomer(){
    this.sub = this.route.parent.params.subscribe(params => {
      this.userType = params["type"];
      this.userId = params["id"];
      this.customersSrvc.getCustomerProfile(this.userType, this.userId).subscribe(data => {
        this.cust = data.cust;
        this.cust_meta = data;
        this.customer = data.cust;
        // Publish section
        this.DataService.onProfileNav.emit({ 'cust':data.cust,'location': 'profile', 'data': { 'wallet_balance': data.wallet_balance } });
        this.checkIfEmailIsVerified(data.cust.VALIDATION_DONE);
      });
    });
  }
  checkIfEmailIsVerified(VALIDATION_DONE){
    let allowedGroups = VALIDATION_DONE.split(',');
    console.log(allowedGroups)
    if (allowedGroups[2] == '0') {
      console.log(1)
      this.showresendemail = true;
    }
  }
  deleteCustomer(userId){
    this.DataService.onDeleteCustomer.emit({ 'user': userId });
  }
  resendWelcomeMail(userId){
    this.DataService.resendWelcomeMail.emit({ 'user': userId });
  }
  // Load the 

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
