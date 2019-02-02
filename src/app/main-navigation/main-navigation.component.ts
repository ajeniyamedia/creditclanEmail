import { Component, OnInit, ElementRef, OnDestroy, ViewContainerRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";
import { AnonymousSubscription } from "rxjs/Subscription";
import { OfferModel } from '../_models/offer.model';
import { CustomersService } from '../_services/customers.service';
import { MarketService, DataService, UserService, CustomerService, AuthenticationService, StorageService, InvestmentService, LoansService, OptionsserviceService, OperationsService } from '../_services/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {
  @Input('isloan') isloan = true;
  webussd = false; 
  newLoanOpen = false;
  is_company_staff = false;
  test_mode = false;
  offer: OfferModel;
  public is_done = '0';
  public loading = false;
  public openShowInterest = false;
  public currentUser: any;
  customers: any;
  searchTerm: any;
  viewOptions = false;
  overlayOpen = false;
  emailopen = '';
  public dashboarddata: any;
  public dashboardFilter = { byMe: false };
  public selectedCustomer: any;
  public customerSelected = false;
  public notifications = {
    count: '0',
    notifications: []
  }
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
  public enable_peer = '0';
  public accounting = '0';
  newCustomerRecord = false;
  main_menu = 'loans';
  constructor(private toastr: ToastrService, private DataService: DataService,
    public router: Router, public operationsService: OperationsService,
    public storageService: StorageService,
    protected customerService: CustomerService, public marketService: MarketService,
    private _eref: ElementRef) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
    this.accounting = this.storageService.read<any>('enable_accounting');
    this.is_company_staff = this.storageService.read<any>('is_company_staff');
    this.test_mode = this.storageService.read<any>('test_mode');
    this.DataService.onViewLoan.subscribe(res => {

      this.overlayOpen = false;
      if (res.from == '1') {

        this.router.navigate(['../loan/' + res.request_id]);
      }
    })
    this.DataService.runOperationsTest.subscribe(res => {

      this.operationsService.runOPTests();
    })
    this.DataService.makeOfferToMarketLoan.subscribe(res => {

      this.overlayOpen = false;
      this.openShowInterest = true;
      this.loading = false;
      this.is_done = '0'
      this.offer = new OfferModel(res.REQUEST_ID, res.PLATFORM_ID, res.PEOPLE_ID, 
        res.REQUEST_PRINCIPAL, res.REQUEST_TENOR, res.REQUEST_PERIOD_ID, 
        res.REQUEST_RATE, res.REQUEST_RATE_PERIOD_ID, '1', '3')
    });

    this.DataService.openmailevent.subscribe(res => {
      console.log(1)
      this.emailopen = res.emailopen;
      console.log(res.emailopen);
    });
  }

  ngOnInit() {
    this.loadDashboardData();
    this.is_company_staff = this.storageService.read<any>('is_company_staff');
    this.test_mode = this.storageService.read<any>('test_mode');
    const currentUrl = this.router.url;
    if (currentUrl == '/savings') {
      this.main_menu = 'savings';
    } else {
      this.main_menu = 'loans';
    }
  }
  golive() {

  }
  closeShowInterest() {
    this.overlayOpen = false;
    this.openShowInterest = false;
  }
  private loadDashboardData(): void {

    this.postsSubscription = this.operationsService.loanPlatforWallet(this.currentUser.token, this.dashboardFilter)
      .subscribe(dashboarddata => {
        if (dashboarddata == false) {
          this.router.navigate(['/login']);
        } else {
          this.dashboarddata = dashboarddata
        }
      });
  }
  public ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  private subscribeToData(): void {
    //this.timerSubscription = Observable.timer(2000).first().subscribe(() => this.loadDashboardData());
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.viewOptions = false;
    }
  }
  openLoanForm(customer) {
    this.selectedCustomer = customer;
    this.customerSelected = true;
    this.overlayOpen = true;
    //this.DataService.onGetCustomer.emit(customer);
  }

  // Search for customer
  search() {
    let data = {
      ORDER_BY: 2,
      SEARCH_NAME: this.searchTerm,
      SEARCH_TYPE: 0
    };

    this.customerService.searchForCustomers(this.currentUser.token, this.searchTerm, '')
      .subscribe(data => {
        this.customers = data
        this.viewOptions = true;
      });
  }


  makeOfferToAdvertisedLoan() {
    this.loading = true;
    this.marketService.makeOfferToAdvertisedLoan(this.currentUser.token, this.offer)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
        if (data.status == '0') {
          this.showError(data.message)
        }
      });
  }

}
