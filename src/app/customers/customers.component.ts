import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomersService } from '../_services/customers.service';
import { ConstantsService } from '../_services/constants.service';
import { DataService,UserService, CustomerService, AuthenticationService, StorageService } from '../_services/index';
import { InvestmentService, LoansService, OptionsserviceService } from '../_services/index';
// declare var $:any;
import { Router } from '@angular/router';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CustomersComponent implements OnInit {

  // Data
  data: any;
  customers: any; // Main customers model
  count: any; // sidebar stat
  api_base: string;
  customerPreview = { 'corporate': {}, 'individual': {} }; // Contains preview information on customers
  openedTab: any; // Currently opened preview tab
  showOptions = '';
  showEmptyState = false;
  category = 'all'; // The current active category of customers being viewed
  searchTerm = '';
  navigation = { 'index': 0, 'next': 0, 'prev': 0, 'complete': true }; // Contains navigation params from the last request
  public currentUser: any;
  public enable_peer='0'; 
  action = 'normal'; // Search, Normal Request or Filter
  //category = 'all'; // The current active category of customers being viewed
  //navigation = {'index': 0, 'next': 0, 'prev': 0}; // Contains navigation params from the last request
  //searchTerm = '';
  investor_box = true;
  borrower_box = true;
  ownershipCustomer:any;
  owningStaff:any;

  view='main';
  public statuses = [
    { value: '0', display: 'All' },
    { value: '2', display: 'USSD' },
    { value: '1', display: 'Mobile' }, 
    { value: '3', display: 'Web' },
    { value: '4', display: 'Back Office' }
  ];
  public durations = [
    { display: '0 - 1', checked: false, min: 0, max: 30 },
    { display: '0 - 3', checked: false, min: 31, max: 90 },
    { display: '4 - 6', checked: false, min: 91, max: 180 },
    { display: '7 - 12', checked: false, min: 181, max: 365 },
    { display: '1+ Years', checked: false, min: 366, max: 3650 }
  ];
  sectors: any;
  occupations:any;
  magic_filter = { reset:false,account_officer:false,start: 0, token: '', registered_from: this.statuses[0].value, searchText: '', borrower: true, investor: true, loans: '', investments: '', ratings_one: false, ratings_two: false, ratings_three: false, ratings_four: false, ratings_five: false  };
  // Constructor
  constructor(public authService:AuthenticationService,public optionsService:OptionsserviceService, public router: Router,public DataService:DataService,protected customersSrvc: CustomersService, 
    protected constants: ConstantsService, public storageService: StorageService) {
    this.api_base = constants.read('api_base');
    this.currentUser = this.storageService.read<any>('currentUser'); 
    
    this.DataService.reloadCustomers.subscribe(res => {
      this.normalLoad(this.navigation.next-10);
    })
    this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
    if(!authService.canViewModule('1,7,2,3,4,5,1026')){
      this.router.navigate(['../unauthorized']);
    }
  }
  open(page){
    this.view=page;
  } 
  // Fetch the initial list of customers from the server
  ngOnInit() {
    this.normalLoad(0);
    this.optionsService.getOccupation(2).subscribe(sectors => this.sectors = sectors);
    this.optionsService.getOccupation(1).subscribe(sectors => this.occupations = sectors);
  }


  // Normal Loading
  normalLoad(start) {
    this.action = 'normal';
    this.customersSrvc.getCustomersList(this.getCategory(), start,this.magic_filter,this.durations,this.sectors,this.occupations,this.currentUser).subscribe(data => {
      this.data = data;
      this.customers = data.all_cus.a;
      this.count = data.COUNT;

      if (this.customers[0] == undefined) {
        this.showEmptyState = true;
      } else {
        this.showEmptyState = false;
      }

      // Set the navigation params
      this.setNavigationParams(data);
    });
  }
  takeOwnership(customer){
    this.action='1';
    this.ownershipCustomer=customer;
    this.owningStaff=this.currentUser;
    this.DataService.onTakeOwnership.emit(customer);
   
  }
  changeOwnership(customer){ 
    this.ownershipCustomer=customer;
    this.owningStaff=this.currentUser;
    this.DataService.onchangeOwnership.emit(customer);
  }
  // Search 
  searchLoad(start) {

    this.action = 'search';

    let data = {
      start: start,
      term: this.magic_filter.searchText,
      category: this.getCategory()
    };

    if (this.customers[0] == undefined) {
      this.showEmptyState = true;
    } else {
      this.showEmptyState = false;
    }

    this.customersSrvc.searchCustomers(data).subscribe(data => {
      this.customers = data.all_cus.a;
      this.setNavigationParams(data);
    }); 
  }

  // Navigation
  next() {
    if (this.action == 'normal') {
      this.normalLoad(this.navigation.next);
    } else {
      this.searchLoad(this.navigation.next);
    }
  }
  prev() {
    if (this.action == 'normal') {
      this.normalLoad(this.navigation.prev);
    } else {
      this.searchLoad(this.navigation.prev);
    }
  }

  // Set Navigation Parameters
  setNavigationParams(data) {
    this.navigation.index = data.index;
    this.navigation.next = data.start; //data.next;
    this.navigation.prev = data.prev;
    this.navigation.complete = data.complete;
  }


  /**
  * Show some information about the customer on click of the preview button
  */
  showCustomerPreview(event, category, id) {

    event.preventDefault();

    // If the tab is open, then close it.
    if (this.openedTab == id) {
      this.openedTab = 0;
      return;
    }

    // If the data is not loaded, then open it.
    if (this.customerPreview[category][id] == undefined) {
      this.openedTab = id;
      this.customerPreview[category][id] = { data: {} };
      this.customersSrvc.getCustomerPreview(category, id).subscribe(data => {
        this.customerPreview[category][id] = { data: data['cust'], funding: data['funding'], loans: data['loans'], wallet: data['wallet'] };
        console.log(this.customerPreview[category]);
      });
    } else {
      this.openedTab = id;
      return;
    }
  }


  getCategory() {
    if (this.investor_box == true && this.borrower_box == true) {
      this.category = 'all';
    } else if (this.investor_box == true && this.borrower_box == false) {
      this.category = 'investor';
    } else if (this.investor_box == false && this.borrower_box == true) {
      this.category = 'borrower';
    } else if (this.investor_box == false && this.borrower_box == false) {
      this.category = 'all';
    }
    return this.category;
  }


  /* Index changing Actions */
  // Cancel search
  closeSearch() {
    this.searchTerm = '';
    this.navigation.next = 0;
    this.navigation.prev = 0;
    this.normalLoad(this.navigation.next);
  }

  // Repeat the last action: search or normal load...
  handleChange() {
    this.navigation.next = 0;
    this.navigation.prev = 0;
    if (this.action == 'normal') {
      this.normalLoad(this.navigation.next);
    } else {
      this.searchLoad(this.navigation.next);
    }
  }
  checkLevel(sector, event, index) {
    this.durations[index]["checked"] = event;

  }
  getCustomerType(CUSTOMER_TYPE){
    if(CUSTOMER_TYPE==='1'){
      return "individual";
    }else{
      return "corporate";
    }
  }
}
