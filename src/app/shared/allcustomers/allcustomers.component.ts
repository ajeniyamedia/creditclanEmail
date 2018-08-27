import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { CustomService } from '../../_services/custom.service';
import { DataService, UserService, CustomerService, AuthenticationService, StorageService } from '../../_services/index';
import { InvestmentService, LoansService, OptionsserviceService } from '../../_services/index';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allcustomers',
  templateUrl: './allcustomers.component.html',
  styleUrls: ['./allcustomers.component.css']
})
export class AllcustomersComponent implements OnInit {
  searchTerm='';
  start: number = 0;
  loading = false;
  view = 'main';
  count = '0';
  openedTab: any; // Currently opened preview tab
  public statuses = [
    { value: '0', display: 'All' },
    { value: '2', display: 'USSD' },
    { value: '1', display: 'Mobile' },
    { value: '3', display: 'Web' },
    { value: '4', display: 'Back Office' }
  ];
  magic_filter = {
    reset: false,
    account_officer: false,
    start: 0,
    token: '',
    registered_from: this.statuses[0].value,
    searchText: '',
    borrower: true,
    investor: true,
    loans: '',
    investments: '',
    ratings_one: false,
    ratings_two: false,
    ratings_three: false,
    ratings_four: false,
    ratings_five: false
  };
  action = 'normal'; // Search, Normal Request or Filter
  investor_box = true;
  borrower_box = true;
  ownershipCustomer: any;
  owningStaff: any;
  public durations = [
    { display: '0 - 1', checked: false, min: 0, max: 30 },
    { display: '0 - 3', checked: false, min: 31, max: 90 },
    { display: '4 - 6', checked: false, min: 91, max: 180 },
    { display: '7 - 12', checked: false, min: 181, max: 365 },
    { display: '1+ Years', checked: false, min: 366, max: 3650 }
  ];
  currentUser: any;
  customers: any;
  verifier = { phone_verifier: false, email_verifier: false, bvn_verifier: false, PEOPLE_CUSTOMERS_ID: '' };
  enable_peer: any;
  constructor(public toastr: ToastrService, public authService: AuthenticationService, public optionsService: OptionsserviceService,
    public router: Router, public dataService: DataService, protected customersSrvc: CustomersService,
    protected constants: ConstantsService, public storageService: StorageService, public customService: CustomService) {
    //this.api_base = constants.read('api_base');
    this.currentUser = this.storageService.read<any>('currentUser');
    this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
    // this.DataService.reloadCustomers.subscribe(res => {
    //   this.normalLoad(this.navigation.next - 10);
    // })
    // this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
    // if (!authService.canViewModule('1,7,2,3,4,5,1026')) {
    //   this.router.navigate(['../unauthorized']);
    // }
  }

  ngOnInit() {
    this.loadCustomers();
  }
  open(page) {
    this.view = page;
  }
  searchLoad() {

    this.loadCustomers();
  }
  normalLoad(start) {
    // this.action = 'normal';
    // this.customersSrvc.getCustomersList(this.getCategory(), start, this.magic_filter, this.durations, this.sectors, this.occupations, this.currentUser).subscribe(data => {
    //   this.data = data;
    //   this.customers = data.all_cus.a;
    //   this.count = data.COUNT;

    //   if (this.customers[0] == undefined) {
    //     this.showEmptyState = true;
    //   } else {
    //     this.showEmptyState = false;
    //   }

    //   // Set the navigation params
    //   this.setNavigationParams(data);
    // });
  }
  checkLevel(sector, event, index) {
    this.durations[index]["checked"] = event;

  }
  loadCustomers() {
    this.customService.getAllCustomers(this.currentUser.token, this.start, this.searchTerm)
      .subscribe(result => {
        this.customers = result;
        this.count = result.count;
        this.start = parseInt(result.start);
      });
  }
  getCustomerType(CUSTOMER_TYPE) {
    if (CUSTOMER_TYPE === '1') {
      return "individual";
    } else {
      return "corporate";
    }
  }
  showCustomerPreview(event, category, id) {

    event.preventDefault();

    // If the tab is open, then close it.
    if (this.openedTab == id) {
      this.openedTab = 0;
      return;
    } else {
      this.openedTab = id;
      return;
    }

  }
  takeOwnership(customer) {
    this.action = '1';
    this.ownershipCustomer = customer;
    this.owningStaff = this.currentUser;
    this.dataService.onTakeOwnership.emit(customer);

  }
  changeOwnership(customer) {
    this.ownershipCustomer = customer;
    this.owningStaff = this.currentUser;
    this.dataService.onchangeOwnership.emit(customer);
  }
  saveVerification(value, valid, PEOPLE_CUSTOMERS_ID) {

    this.loading = true;
    this.customersSrvc.saveVerification(value, this.currentUser.token, PEOPLE_CUSTOMERS_ID).subscribe(data => {
      this.loading = false;
      if (data.status == true) {
        this.showSuccess("Update successful");
      } else {
        this.showError("Error occured")
      }
    });
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  next() {
    this.start += 20;
    this.loadCustomers();
  }
  prev() {
    this.start = this.start - 20;
    this.loadCustomers();
  }
}
