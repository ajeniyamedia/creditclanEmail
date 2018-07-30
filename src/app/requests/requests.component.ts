import { Component, OnInit, Input, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { DataService, OptionsserviceService, UserService, LoansService, AuthenticationService, StorageService } from '../_services/index';
import { User } from '../_models/index';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsComponent implements OnInit {

  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
  @ViewChild('advancedSliderElement') advancedSliderElement: IonRangeSliderComponent;
  simpleSlider = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
  simpleSlider_ = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
  advancedSlider = { name: 'Advanced Slider', onUpdate: undefined, onFinish: undefined };
  public type_of_view = '1';
  public loading = true;
  public searchView = false;
  public currentUser: any;
  public calendarView = false;
  showSearch = false;
  
  sectors: any;
  approval_levels;
  public statuses = [
    { value: '1', display: 'Requests' },
    { value: '2', display: 'Portfolio' },
    { value: '5', display: 'Rejected' },
    { value: '6', display: 'Contract Created' },
    { value: '-3', display: 'Ineligible' },
    { value: '-6', display: 'Terminated' },
    { value: '-4', display: 'Disbursements' },
    { value: '-1', display: 'Repaid' },
    { value: '-2', display: 'All' },
    { value: '6', display: 'Contract' }
  ];
  public durations = [
    { display: '0 - 1', checked: false, min: 0, max: 30 },
    { display: '0 - 3', checked: false, min: 31, max: 90 },
    { display: '4 - 6', checked: false, min: 91, max: 180 },
    { display: '7 - 12', checked: false, min: 181, max: 365 },
    { display: '1+ Years', checked: false, min: 366, max: 3650 }
  ];
  public request_date = [
    { display: 'Today', checked: false, min: 0, max: 1 },
    { display: '2 - 7 days', checked: false, min: 2, max: 7 },
    { display: '2 - 4 weeks', checked: false, min: 8, max: 30 },
    { display: '1+ months', checked: false, min: 31, max: 100000 }
  ];
  summaryOpen = false;
  min = 0;
  max = 100;
  min_ = 0;
  max_ = 1000000;
  overlayType = '0';
  viewing_loan = false;
  loan_viewed = '0';
  public slaveOpen = '0';
  public masterClosed = '0';
  magic_filter = { customer_category: '0', peer_to_peer: '', reset: false, my_approvals: false, account_officer: false, start: 0, funding: '100', token: '', min: 0, max: 10000000, loan_status: this.statuses[0].value, searchText: '', ratings_one: false, ratings_two: false, ratings_three: false, ratings_four: false, ratings_five: false, funding_amount_one: 1, funding_amount_two: 1, funding_amount_three: false, funding_status_disbursement: false, funding_status_contract_created: false, funding_status_applied: false, funding_status_funded: false, funding_status: false, amount: false, approval_level: false, rating: false, sector: false, date: false };
  loans: any;
  miniSearch = false;
  dontshownext = '0';
  view_state = '0';
  enable_bulk_disbursements = false;
  openforbulkpay = false;
  public applyMethod = { '1': 'USSD', '2': 'Mobile', '3': 'Back Office', '4': 'Back Office' };
  constructor(public authService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document,
    private DataService: DataService,
    private router: Router,
    public optionsService: OptionsserviceService,
    public fb: FormBuilder,
    public loansService: LoansService, public storageService: StorageService
  ) {
    this.currentUser = this.storageService.read<any>('currentUser');
    if (!this.authService.canViewModule('1,2,3,4,5,1026')) {
      this.router.navigate(['../unauthorized']);
    }
    this.type_of_view = this.storageService.read<any>('type_of_view');
    this.DataService.showGridView.subscribe(res => {
      this.calendarView = false;
      this.type_of_view = '1'
    })
    this.DataService.prepareBulkPay.subscribe(res => {
      this.openforbulkpay = true;
    })
    this.DataService.onResetFilters.subscribe(res => {
      this.resetFilters()
    })
    this.DataService.showListView.subscribe(res => {
      this.calendarView = false;
      this.type_of_view = '2';
    })
    this.DataService.filterLoans.subscribe(res => {

      this.magic_filter = res.magic_filter;
      this.durations = res.durations;
      this.approval_levels = res.approval_levels;
      this.request_date = res.request_date;
      this.magic_filter.reset = false;
      this.getLoans();
    })
    this.DataService.onSearchForLoans.subscribe(res => {
      // this.magic_filter=res;
      this.magic_filter.reset = false
      this.magic_filter.searchText = res;
      this.searchForLoans();
    })
    this.DataService.openSearchView.subscribe(res => {
      this.magic_filter = res.magic_filter;
      this.durations = res.durations;
      this.approval_levels = res.approval_levels;
      this.request_date = res.request_date;
      this.magic_filter.reset = false;
      this.searchView = true;
    })
    this.DataService.closeSearchView.subscribe(res => {
      this.searchView = false;
    })
  }
  bulkpayrequests: any;
  ngOnInit() {
    
    this.DataService.hideCustomerCategoryFilter.emit({ hideStatus: false, magic_filter: this.magic_filter })
    const storeddata = this.storageService.readArray<any>('bulkpayrequests');
    if (storeddata) {
      this.bulkpayrequests = JSON.parse(storeddata);
    } else {
      this.bulkpayrequests = []
    }
    this.statuses = [
      { value: '1', display: 'Requests' },
      { value: '2', display: 'Portfolio' },
      { value: '-6', display: 'Terminated' },
      { value: '5', display: 'Rejected' },
      { value: '-3', display: 'Ineligible' },
      { value: '-4', display: 'Disbursements' },
      { value: '-1', display: 'Repaid' },
      { value: '-2', display: 'All' },
      { value: '6', display: 'Contract Created' },
    ];
    let currentUrl = this.router.url;
    if (currentUrl == '/requests/pending') {
      this.magic_filter.loan_status = '1';
      this.calendarView = false;
      this.statuses = [
        { value: '1', display: 'Requests' },
        { value: '5', display: 'Rejected' },
        { value: '-3', display: 'Ineligible' },
        { value: '-6', display: 'Terminated' },
        { value: '-4', display: 'Disbursements' },
        { value: '-2', display: 'All' },
        { value: '6', display: 'Contract Created' },
      ];
    }
    if (currentUrl == '/requests/portfolio') {
      this.statuses = [
        { value: '2', display: 'Portfolio' },
        { value: '-1', display: 'Repaid' },
      ];
      this.magic_filter.loan_status = '2';
      this.calendarView = false;
      this.DataService.hideCustomerCategoryFilter.emit({ hideStatus: true })
    }
    if (currentUrl == '/requests/historical') {
      this.magic_filter.loan_status = '3';
      this.calendarView = false;
    }
    if (currentUrl == '/requests/calendar') {
      this.statuses = [
        { value: '2', display: 'Portfolio' },
      ];
      this.magic_filter.loan_status = '2';
      this.calendarView = true;
    }
    if (currentUrl == '/requests/draft') {
      this.statuses = [
        { value: '1', display: 'Requests' },
        //{ value: '4', display: 'Draft' },
        { value: '5', display: 'Rejected' },
        { value: '-3', display: 'Ineligible' },
        { value: '-4', display: 'Disbursements' },
        { value: '-2', display: 'All' }
      ];
      this.magic_filter.loan_status = '4';
      this.calendarView = false;
    }
    if (currentUrl == '/requests/rejected') {
      this.statuses = [
        { value: '1', display: 'Requests' },
        { value: '4', display: 'Draft' },
        { value: '5', display: 'Rejected' },
        { value: '-3', display: 'Ineligible' },
        { value: '-4', display: 'Disbursements' },
        { value: '-2', display: 'All' },
        { value: '6', display: 'Contract Created' },
      ];
      this.magic_filter.loan_status = '5';
      this.calendarView = false;
    }
    if (currentUrl == '/requests/terminated') {
      this.statuses = [
        { value: '1', display: 'Requests' },
        { value: '4', display: 'Draft' },
        { value: '5', display: 'Rejected' },
        { value: '-3', display: 'Ineligible' },
        { value: '-6', display: 'Terminated' },
        { value: '-4', display: 'Disbursements' },
        { value: '-2', display: 'All' },
        { value: '6', display: 'Contract Created' },
      ];
      this.magic_filter.loan_status = '-6';
      this.calendarView = false;
    }
    if (currentUrl == '/requests/market') {
      this.magic_filter.loan_status = '100';
      this.calendarView = false;
    }
    if (currentUrl == '/requests/ineligible') {
      this.statuses = [
        { value: '1', display: 'Requests' },
        { value: '4', display: 'Draft' },
        { value: '5', display: 'Rejected' },
        { value: '-3', display: 'Ineligible' },
        { value: '-4', display: 'Disbursements' },
        { value: '-2', display: 'All' },
        { value: '6', display: 'Contract Created' },
      ];
      this.magic_filter.loan_status = '-3';
      this.calendarView = false;
    }
    if (currentUrl == '/requests/disbursements') {
      this.statuses = [
        { value: '1', display: 'Requests' },
        { value: '4', display: 'Draft' },
        { value: '5', display: 'Rejected' },
        { value: '-3', display: 'Ineligible' },
        { value: '-4', display: 'Disbursements' },
        { value: '-2', display: 'All' },
        { value: '6', display: 'Contract Created' },
      ];
      this.magic_filter.loan_status = '-4';
      this.calendarView = false;

    }
    if (currentUrl == '/requests/repaid') {
      this.statuses = [
        { value: '2', display: 'Portfolio' },
        { value: '-1', display: 'Repaid' },
      ];
      this.magic_filter.loan_status = '-1';
      this.calendarView = false;
    }
    if (currentUrl == '/requests/all') {
      this.magic_filter.loan_status = '-2';
      this.calendarView = false;
    }
    this.magic_filter.reset = false;
    const self = this;
    if (currentUrl == '/requests/contract') {
      this.statuses = [
        { value: '1', display: 'Requests' },
        { value: '4', display: 'Draft' },
        { value: '5', display: 'Rejected' },
        { value: '-3', display: 'Ineligible' },
        { value: '-4', display: 'Disbursements' },
        { value: '-2', display: 'All' },
        { value: '6', display: 'Contract Created' },
      ];
      this.magic_filter.loan_status = '6';
      this.calendarView = false;

    }
    this.getLoans_();

    this.optionsService.getOccupation(2).subscribe(sectors => this.sectors = sectors);
    this.optionsService.getApprovalLevels(this.currentUser.token).subscribe(levels => this.approval_levels = levels);
    this.DataService.onChangeRequestRoute.emit({ status: this.statuses });
    this.DataService.viewAnalyticsResults.subscribe(res => {
      this.calendarView = false;
      this.type_of_view = '2';
    });
  }
  private refreshData(): void {
    this.postsSubscription = this.loansService.filterLoans(this.currentUser.token, this.magic_filter, [], [], [], [], [])

      .subscribe(customers => {
        this.loading = false;
        this.loans = customers;
        this.DataService.onRequestRoute.emit(customers);
        this.subscribeToData();
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
    //this.timerSubscription = Observable.timer(10000).first().subscribe(() => this.refreshData());
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= 700) {
      // you're at the bottom of the page
      this.summaryOpen = true;
    } else {
      this.summaryOpen = false;
    }

  }
  searchForLoans() {
    this.loading = true;
    this.loansService.searchForLoans(this.currentUser.token, this.magic_filter)
      .subscribe(customers => {
        this.loading = false;
        this.loans = customers;
      });
    // this.getLoans();
  }
  resetFilters() {
    this.getLoans();
  }
  checkLevel(sector, event, index) {
    this.durations[index]['checked'] = event;

  }
  displayCondition(i) {
    if (i <= 2) {
      return true;
    } else {
      return false;
    }
  }
  checkLevel_(sector, event, index) {
    this.approval_levels[index]['checked'] = event;

  }
  checkSector(sector, event, index) {
    this.sectors[index]['checked'] = event;

  }
  loadingMore = false
  loadMoreRecords(start) {
    this.magic_filter.start = start
    // this.getLoans()
    this.searchView = false;
    this.calendarView = false;
    //this.loading=true;
    this.magic_filter.token = this.currentUser.token;
    this.loadingMore = true;
    this.loansService.filterLoans(this.currentUser.token, this.magic_filter, this.sectors, this.approval_levels, this.statuses, this.durations, this.request_date)
      // this.loansService.getLoans(this.magic_filter)
      .subscribe(customers => {
        this.magic_filter.reset = false;
        this.loadingMore = false;
        if (customers.status == false) {
          this.router.navigate(['/login']);
        } else {
          this.loadingMore = false;
          this.loans = customers;
          this.DataService.onRequestRoute.emit(customers);
        }
      });
  }
  openSlave(REQUEST_ID) {

    this.masterClosed = REQUEST_ID;
    this.slaveOpen = REQUEST_ID;
  }
  checkDate(sector, event, index) {
    this.request_date[index]['checked'] = event;

  }
  view_contract(REQUEST_ID) {

    this.dontshownext = '1';
    this.viewing_loan = true;
    this.loan_viewed = REQUEST_ID;

  }
  view_loan(request) {
    if (request.IS_PEER_TO_PEER == '1') {
      this.router.navigate(['/loan', request.REQUEST_ID, 'p2p']);
    } else {
      this.router.navigate(['/loan', request.REQUEST_ID]);
    }
  }
  view_schedule(REQUEST_ID) {
    this.viewing_loan = true;
    this.overlayType = '3';
    this.loan_viewed = REQUEST_ID;
  }
  make_payment(REQUEST_ID) {
    this.viewing_loan = true;
    this.overlayType = '1';
    this.loan_viewed = REQUEST_ID;
  }
  view_summary(REQUEST_ID) {
    this.viewing_loan = true;
    this.overlayType = '4';
    this.loan_viewed = REQUEST_ID;
  }
  getLoans() {
    this.searchView = false;
    this.calendarView = false;
    this.loading = true;

    this.magic_filter.token = this.currentUser.token;
    this.loansService.filterLoans(this.currentUser.token, this.magic_filter, this.sectors, this.approval_levels, this.statuses, this.durations, this.request_date)

      .subscribe(customers => {
        this.magic_filter.reset = false;
        if (customers.status == false) {
          this.router.navigate(['/login']);
        } else {
          this.loading = false;
          this.loans = customers;
          this.DataService.onRequestRoute.emit(customers);
        }
      });
  }
  percent_funded(val) {
    return val + '%';
  }
  getLoans_() {

    this.magic_filter.token = this.currentUser.token;
    this.loansService.filterLoans(this.currentUser.token, this.magic_filter, [], [], [], [], [])

      .subscribe(customers => {
        this.loading = false;
        this.loans = customers;
        this.DataService.onRequestRoute.emit(customers);
        this.enable_bulk_disbursements = customers.lender.ENABLE_BULK_DISBURSEMENT;
        let currentUrl = this.router.url;
        this.DataService.enableBulkDisbursements.emit(customers.lender.ENABLE_BULK_DISBURSEMENT);
      });


  }
  showActiveRequests() {
    this.calendarView = false;
  }
  open_loan(request_id) {
    this.DataService.onCheckLoan.emit({ request_id: request_id, dontshownext: this.dontshownext, view_state: this.view_state });
    // this.viewing_loan = true;
    // this.loan_viewed = request_id;
  }
  check_ineligible_loan(REQUEST_ID, loan_status) {
    this.DataService.onCheckLoan.emit({ request_id: REQUEST_ID, dontshownext: 0, view_state: this.view_state, loan_status: loan_status });
  }
  closeOverlay() {
    this.viewing_loan = false
  }
  closeOverlay_(event) {
  }
  closeSearch() {
    this.showSearch = false;
  }
  about_contract(request_id) {
    this.router.navigate(['../statement/' + request_id + '/schedule']);
  }
  reverse_transaction(loan) {
    this.DataService.onReverseTransaction.emit({ loan: loan });
  }
  update(slider, event) {
    slider.onUpdate = event;
    this.magic_filter.min = event.from;
    this.magic_filter.max = event.to;
  }
  update_(slider, event) {
    this.magic_filter.funding = event.from;
  }
  update__(slider, event) {
    this.magic_filter.min = this.min_;
    this.magic_filter.max = event.from;
  }
  finish(slider, event) {
    slider.onFinish = event;
    this.magic_filter.min = event.from;
    this.magic_filter.max = event.to;
  }

  setAdvancedSliderTo(from, to) {
    this.advancedSliderElement.update({ from: from, to: to });
  }
  getTotalFunded(PERCENTAGE_FUNDED, REQUEST_PRINCIPAL) {
    return parseFloat(PERCENTAGE_FUNDED) / 100 * parseFloat(REQUEST_PRINCIPAL);
  }
  getTotalRemaining(REQUEST_PRINCIPAL, TOTAL_FUNDED) {
    return parseFloat(REQUEST_PRINCIPAL) - parseFloat(TOTAL_FUNDED);
  }
  makeOffer(loan) {
    this.DataService.makeOfferToMarketLoan.emit(loan);
  }
  addToBulkPay(request_id, confirm, loan) {
    if (confirm) {
      const index = this.bulkpayrequests.indexOf(request_id);
      if (index > -1) {

      } else {
        this.bulkpayrequests.push(request_id)
      }

    } else {
      const index = this.bulkpayrequests.indexOf(request_id);
      if (index > -1) {
        this.bulkpayrequests.splice(index, 1);
      }
    }
    localStorage.setItem('bulkpayrequests', JSON.stringify(this.bulkpayrequests));
    this.DataService.updateTotalBulkDisbursements.emit({ loan: loan, confirm: confirm });
  }
  addedToBulkPay(request_id) {
    if (this.bulkpayrequests === null || this.bulkpayrequests.indexOf(request_id) < 0) {
      return false;
    } else {
      return true;
    }
  }
  rad(event) {

  }
  rac(event) {

  }
  disburse: any;
  overlayOpenPayConfirm = false;
  doCheckWalletTransactionStatus(loan) {
    this.DataService.doCheckWalletTransactionStatuses.emit({ loan: loan });

  }
}
