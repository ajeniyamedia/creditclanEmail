import { Component, OnInit, Input, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { DataService, OptionsserviceService, UserService, LoansService, AuthenticationService, StorageService } from '../../_services/index';
import { User } from '../../_models/index';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestsdash',
  templateUrl: './requestsdash.component.html',
  styleUrls: ['./requestsdash.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsdashComponent implements OnInit {

  @ViewChild('advancedSliderElement') advancedSliderElement: IonRangeSliderComponent;
  simpleSlider = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
  simpleSlider_ = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
  advancedSlider = { name: 'Advanced Slider', onUpdate: undefined, onFinish: undefined };
  public type_of_view='1';
  public loading = true;
  public searchView = false;
  public currentUser: any;
  public calendarView = false;
  queueModal=false;
  showSearch = false;
  bulkpayrequests:any;
  public statuses = [
    { value: '-2', display: 'All' },
    { value: '-1', display: 'Repaid' },
    { value: '-6', display: 'Terminated' },
    { value: '-4', display: 'Disbursements'},
    { value: '5', display: 'Rejected' },
    { value: '-3', display: 'Ineligible' },
    { value: '6', display: 'Contract Created' },
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
  showViewOptions=false
  public slaveOpen = '0';
  public masterClosed = '0';
  sectors: any;
  approval_levels;
  magic_filter = { company_id:'',peer_to_peer:'',reset:false,my_approvals:false,account_officer:false,start: 0, funding: '100', token: '', min: 0, max: 10000000, loan_status: this.statuses[0].value, searchText: '', ratings_one: false, ratings_two: false, ratings_three: false, ratings_four: false, ratings_five: false, funding_amount_one: 1, funding_amount_two: 1, funding_amount_three: false, funding_status_disbursement: false, funding_status_contract_created: false, funding_status_applied: false, funding_status_funded: false, funding_status: false, amount: false, approval_level: false, rating: false, sector: false, date: false };
  loans: any;
  miniSearch = false;
  dontshownext = '0';
  view_state = '0';
  datechosen:any;
  overlayOpen=false;
  loan_status='0';
  enable_bulk_disbursements=false;
  companies:any;
  reverseModal=false;
  loan_reverse:any;
  canDisburse=false;
  constructor( @Inject(DOCUMENT) private document: Document, 
  private DataService: DataService, 
  private router: Router, 
  public optionsService: OptionsserviceService, 
  private authService:AuthenticationService,
  public fb: FormBuilder, 
  public loansService: LoansService, 
  public storageService: StorageService,) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.type_of_view = this.storageService.read<any>('type_of_view');
    this.DataService.onpreviewLoan.subscribe(res => {
      this.open_loan(res)

    })
    this.DataService.enableBulkDisbursements.subscribe(res => {
      this.enable_bulk_disbursements = res;

    })
    this.DataService.updateTotalBulkDisbursements.subscribe(res => {
      this.updateTBD(res);

    })
    this.DataService.doCheckWalletTransactionStatuses.subscribe(res => {
      console.log(1)
      this.doCheckWalletTransactionStatus(res);

    })
    this.DataService.onRequestRoute.subscribe(res => {
      this.loans=res;
      this.searchView=false;
    })
    this.DataService.onCheckLoan.subscribe(res => {
      //this.dontshownext='1'
      this.viewing_loan=true;
      this.loan_viewed = res.request_id
      this.dontshownext = res.dontshownext
      this.view_state = res.view_state
      this.loan_status=res.loan_status;
    })
    this.DataService.onReverseTransaction.subscribe(res => { 
      this.loan_reverse = res.loan;
      this.reverseModal=true; 
    })
    this.DataService.showCalendarDetails.subscribe(res => { 
      this.datechosen = res.date_chosen;
      this.viewing_loan=false;
      this.overlayOpen=true
    })
    this.DataService.onChangeRequestRoute.subscribe(res => {
      this.statuses = res.status;
    })
  }
   
  downloadList(){
    const bpr = JSON.parse(this.storageService.readArray<any>('bulkpayrequests'));
    
    this.loansService.exportDisburseList(this.currentUser.token, bpr).subscribe(data => {
      if (data.status) {
          alert('Data Successfully exported. Download would start automatically.');
          window.open(data.message);
          return;
      }else{
          alert('Data could not be exported.');
      }
  });
  }
  ngOnInit() {
    if(this.authService.canViewModule('3')){
      this.canDisburse = true;
    } 
    this.type_of_view = this.storageService.read<any>('type_of_view');
    const total_bulk_pay_amount = this.storageService.read<any>('total_bulk_pay_amount');
    if (total_bulk_pay_amount) {
        this.total_bulk_pay_amount = total_bulk_pay_amount;
    }else{
        this.total_bulk_pay_amount=0;
    }
    //this.getLoans_();
    let currentUrl = this.router.url;
    if(currentUrl=='/requests/pending'){
      this.magic_filter.loan_status='1';
      this.calendarView=false;
      
    }
    if(currentUrl=='/requests/pending'){
      this.magic_filter.loan_status='1';
      this.calendarView=false;
    }
    if(currentUrl=='/requests/portfolio'){
      this.magic_filter.loan_status='2';
      this.calendarView=false;
    }
    if(currentUrl=='/requests/ineligible'){
      this.magic_filter.loan_status='-3';
      this.calendarView=false;
    }
    if(currentUrl=='/requests/disbursements'){
      this.magic_filter.loan_status='-4';
      this.calendarView=false;
    }
    if(currentUrl=='/requests/all'){
      this.magic_filter.loan_status='-2';
      this.calendarView=false;
    }
    if(currentUrl=='/requests/repaid'){
      this.magic_filter.loan_status='-1';
      this.calendarView=false;
    }
    if(currentUrl=='/requests/historical'){
      this.magic_filter.loan_status='3';
      this.calendarView=false;
    }
    if(currentUrl=='/requests/calendar'){
      this.magic_filter.loan_status='2';
      this.calendarView=true;
    }
    if(currentUrl=='/requests/market'){
      this.magic_filter.loan_status='100';
      this.calendarView=true;
    }
    if(currentUrl=='/requests/contract'){
      this.magic_filter.loan_status='6';
      this.calendarView=true;
    }
    this.optionsService.getOccupation(2).subscribe(sectors => this.sectors = sectors);
    this.optionsService.getCompanies(this.currentUser.token).subscribe(companies => this.companies = companies);
    this.optionsService.getApprovalLevels(this.currentUser.token).subscribe(levels => this.approval_levels = levels);
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
  total_bulk_pay_amount=0;
  prepareBulkPay(){
    if(this.total_bulk_pay_amount>0){
      const storeddata = this.storageService.readArray<any>('bulkpayrequests');
      if (storeddata) {
          this.bulkpayrequests = JSON.parse(storeddata);
      }else{
          this.bulkpayrequests=[]
      }
      this.queueModal = true;
    }
    
  }
  openSearchView(){
    this.searchView=true
    this.DataService.openSearchView.emit({'magic_filter':this.magic_filter,'durations':this.durations,'approval_levels':this.approval_levels,request_date:this.request_date,});
  }
  closeSearchView(){
    this.searchView=false
    this.DataService.closeSearchView.emit();
  }
  searchForLoans() {
   
    this.DataService.onSearchForLoans.emit(this.magic_filter.searchText);
  }
  myAccounts(event){
    
    //this.magic_filter.account_officer=event.target.checked;
    this.magic_filter.account_officer=event;
    this.searchForLoans();
  }
  myApprovals(event){
    
    this.magic_filter.my_approvals=event.target.checked;
    //this.magic_filter.account_officer=event;
    this.searchForLoans();
  }
  checkLevel(sector, event, index) {
    
    this.durations[index]['checked'] = event;
    
  }
  resetFilters(){
    this.magic_filter.reset=true;
    this.DataService.onResetFilters.emit(this.magic_filter);
  }
  displayCondition(i) {
    // if (i <= 2) {
    //   return true;
    // } else {
    //   return false;
    // }
    return true;
  }
  checkLevel_(sector, event, index) {
    this.approval_levels[index]['checked'] = event;

  }
  checkSector(sector, event, index) {
    this.sectors[index]['checked'] = event;

  }
  loadMoreRecords(start) {
    this.magic_filter.start = start
    this.getLoans()
  }
  openSlave(REQUEST_ID) {
    this.masterClosed = REQUEST_ID;
    this.slaveOpen = REQUEST_ID;
  }
  checkDate(sector, event, index) {
    this.request_date[index]['checked'] = event;

  }
  view_contract(REQUEST_ID) {
    // this.viewing_loan=true;
    // this.overlayType='2';
    // this.loan_viewed = REQUEST_ID;
    //this.DataService.onpreviewLoan.emit(REQUEST_ID);
    this.dontshownext = '1';
    this.viewing_loan = true;
    this.loan_viewed = REQUEST_ID;

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
    this.DataService.filterLoans.emit({'magic_filter':this.magic_filter,'durations':this.durations,'approval_levels':this.approval_levels,request_date:this.request_date,});
     
  }
  getLoanLink(status){
    this.magic_filter.loan_status = status;
    this.getLoans_();
  }
  getLoans_() {
    this.calendarView=false;
  
   if(this.magic_filter.loan_status=='-1'){
    this.router.navigate(['/requests/repaid']);
  } 
  if(this.magic_filter.loan_status=='-6'){
    this.router.navigate(['/requests/terminated']);
  } 
  if(this.magic_filter.loan_status=='-2'){
    this.router.navigate(['/requests/all']);
  }  
  if(this.magic_filter.loan_status=='-4'){
    this.router.navigate(['/requests/disbursements']);
  } 
    if(this.magic_filter.loan_status=='1'){
      this.router.navigate(['/requests/pending']);
    } 
    if(this.magic_filter.loan_status=='2'){
      this.router.navigate(['/requests/portfolio']);
    }  
    if(this.magic_filter.loan_status=='3'){
      this.router.navigate(['/requests/historical']);
    } 
    if(this.magic_filter.loan_status=='4'){
      this.router.navigate(['/requests/draft']);
    }  
    if(this.magic_filter.loan_status=='5'){
      this.router.navigate(['/requests/rejected']);
    } 
    if(this.magic_filter.loan_status=='-3'){
      this.router.navigate(['/requests/ineligible']);
    } 
    if(this.magic_filter.loan_status=='6'){
      this.router.navigate(['/requests/contract']);
    } 
  }
  showActiveRequests(){
    this.calendarView=false;
    this.router.navigate(['/requests/portfolio']);
  }
  showCalendar(){
    this.calendarView=true;
    this.router.navigate(['/requests/calendar']);
  }
  open_loan(request_id) {

    this.viewing_loan = true;
    this.loan_viewed = request_id;
  }
  showListView(){
    this.type_of_view='2';
    this.calendarView=false;
    this.DataService.showListView.emit();
  }
  showGridView(){
    this.type_of_view='1';
    this.calendarView=false;
    this.DataService.showGridView.emit();
  }
  closeOverlay() {
    this.viewing_loan = false
    this.overlayOpen=false;
    this.queueModal=false;
    this.reverseModal = false;
    localStorage.removeItem('total_bulk_pay_amount');
    localStorage.removeItem('bulkpayrequests');
    if(this.magic_filter.loan_status=='-4'){
      this.getLoans()
    } 
    
  }
  
  closeOverlay_(event) {
    console.log(event)
  }
  closeSearch() {
    this.showSearch = false;
  }
  about_contract(request_id) {
    this.router.navigate(['../statement/' + request_id + '/schedule']);
  }
  update(slider, event) {
    console.log('Slider updated: ' + slider.name);
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
    console.log('Slider finished: ' + slider.name);
    slider.onFinish = event;
    this.magic_filter.min = event.from;
    this.magic_filter.max = event.to;
  }

  setAdvancedSliderTo(from, to) {
    this.advancedSliderElement.update({ from: from, to: to });
  }
  updateTBD(res){
    if(res.confirm){
      this.total_bulk_pay_amount=this.total_bulk_pay_amount+parseInt(res.loan.HOW_MUCH_WAS_GIVEN)
    }else{
      if(this.total_bulk_pay_amount !=0){
        this.total_bulk_pay_amount=this.total_bulk_pay_amount-parseInt(res.loan.HOW_MUCH_WAS_GIVEN)
      }
      
    }
    localStorage.setItem('total_bulk_pay_amount', JSON.stringify(this.total_bulk_pay_amount));
  }
  disburse:any;
  overlayOpenPayConfirm=false;
  doCheckWalletTransactionStatus(res){
    
    this.loansService.queueForDisbursement(this.currentUser.token, res.loan.REQUEST_ID)
    .subscribe(loans => { 
      if (loans.status) {
        //good to go
        this.disburse = loans.queue.result[0];
        this.overlayOpenPayConfirm=true;
      } 
    });
  }
}
