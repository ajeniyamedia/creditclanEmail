import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { Customer, Loan } from '../_models/index'; 
import { MomentModule } from 'angular2-moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-loansummary',
  templateUrl: './loansummary.component.html',
  styleUrls: ['./loansummary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoansummaryComponent implements OnInit {
  @Input('loan_viewed') loan_viewed: any;
  @Input('is_approval') is_approval=false;
  @Input('dontshownext') dontshownext = '0';
  @Input('pending_approvals') pending_approvals = '0';
  @Input('loan_status') loan_status = '0';
  @Output() modalClosed = new EventEmitter();
  @Output() showMessage = new EventEmitter();
  @Output() openForFinalPayment = new EventEmitter();
  currentUser: any;
  loan: any;
  prev: any;
  next: any;
  offer_area = false;
  @Input('view_state') view_state = '0';
  post_state = '4';
  public loan_currency = "NGN";
  public loan_duration = "Months";
  public interest_duration = "Per Month";
  public countries: any[];
  public viewing_customer_summary = false;
  public applyMethod = { '1': 'USSD', '2': 'Mobile', '3': 'Back Office','4':'Back Office' };
  public loanPurpose = { '1': 'Debt Consolidation', '2': 'Medical Expenses', '3': 'Business' };
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": 1, "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": 2, "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": 3, "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": 4, "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
  ;
  public enable_peer='0';
  public loading = false;
  public platformOffer: any;
  master: number = 0;
  public model: any;
  canDoApproval=false;
  public model_r = { ilo: 0, reject_reason: "", reject_action: "", approval_notes: "", reject_level: "", wtd: 0, request_id: "", level: "" };
  public model_a = { chk_acts: [], past_one: 1, approval_all_waivers: 1, approval_all_checklist: 1, is_waiver_level: 0, has_waiver: 0, ilo: 0, istd: 0, approval_notes: "", wtd: 1, request_id: "", level: "" };
  public approving = false;
  public rejecting = false;
  public level: any;
  public prev_levels: any;
  public IS_PEER_TO_PEER: any;
  public ADDED_TO_PAYMENT_QUEUE: any;
  queue_disbursement = '0';
  pay_from_loan='0';
  loan_approvals = 0;
  loanapprovals:any;
  public approvals_queue: any;
  constructor(private toastr: ToastrService,vcr: ViewContainerRef,private DataService: DataService, public router: Router,
    public optionsService: OptionsserviceService, 
    public route: ActivatedRoute, public loansService: LoansService, public customerService: CustomerService, 
    public userService: UserService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.DataService.onBackToLoanSummary.subscribe(res => {
      this.view_state = '4'
    })
    this.DataService.onMakePaymentFromStatement.subscribe(res => {


      this.loan_viewed = res;
      this.view_state = '7'
    })
    this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }
  showError(msg) {
    this.toastr.error(msg);
  }
  paymentHasBeenQueued(event){
    
    this.openForFinalPayment.emit(event)
  }
  submitOffer(f) {
    this.loading = true 
    this.loansService.updatePlatformOffer(this.currentUser.token, this.platformOffer)
      .subscribe(loan => { 
        this.loading = false;
        if (loan.status) {
          this.loan = loan.loan;
          this.offer_area = false;
        } else {


        }


      });
  }

  changeCurrency(c) {
    this.loan_currency = c.currency[0];
    this.platformOffer.BID_CURRENCY_ID = c.callingCode[0];
  }
  changeDuration(d, T) {
    if (T === 1) {
      this.loan_duration = d.LOAN_DURATION;
      this.platformOffer.BID_PERIOD_ID = d.LOAN_INTEREST_DURATION_ID;
    }
    if (T === 2) {
      this.interest_duration = d.INTEREST_DURATION;
      this.platformOffer.BID_RATE_PERIOD_ID = d.LOAN_INTEREST_DURATION_ID;
    }
  }

  nextLoan(request_id) {

    this.loan_viewed = request_id;
    this.getloan(request_id);
    this.view_state = '0'
  }
  view_loan(request_id) {
    this.router.navigate(['/loan', request_id]);
  }
  ngOnInit() {

    this.getloan(this.loan_viewed);
    this.optionsService.getCountries().subscribe(countries => this.countries = countries);
    if(this.is_approval){
      this.loansService.getLoanApprovals(this.currentUser.token, this.loan_viewed)
        .subscribe(approvals => {
          this.loanapprovals = approvals;
        });
      this.loansService.getApprovalQueue(this.currentUser.token, this.loan_viewed)
        .subscribe(loans => {
          
          this.canDoApproval = loans.status;
          this.approvals_queue = loans.approvals_queue;
          this.level = loans.level;
          this.prev_levels = loans.prev_levels;
          this.model_r.request_id = this.approvals_queue.REQUEST_ID;
          this.model_r.level = this.approvals_queue.LEVEL_ID;
          this.model_a.request_id = this.approvals_queue.REQUEST_ID;
          this.model_a.level = this.approvals_queue.LEVEL_ID;
          this.model_a.ilo = this.approvals_queue.ILO;
          this.model_a.istd = this.approvals_queue.ISTD;
          this.IS_PEER_TO_PEER = loans.IS_PEER_TO_PEER;
          this.ADDED_TO_PAYMENT_QUEUE = loans.ADDED_TO_PAYMENT_QUEUE;
          this.loan_approvals = loans.loan_approvals_count;
          this.queue_disbursement = loans.queue_disbursement;
          this.pay_from_loan = loans.pay_from_loan;
          //this.loanapprovals = loans.loan_approvals; 
        });
    }
  }
  getloan(request_id) {
    this.viewing_customer_summary = false;
    this.loansService.getLoanForPreview__(this.currentUser.token, request_id, this.dontshownext, this.is_approval)
      .subscribe(loan => {
        this.loan = loan.loan;
        this.prev = loan.prev;
        this.next = loan.next;
        this.platformOffer = loan.loan.PLATFORM_OFFER;
      });
  }
  closeOverlay() {
    this.modalClosed.emit("false");
  }
  gotoloan(event) {
    console.log(event)
    this.view_state = event;
  }
  moveToRequests(REQUEST_ID){
    this.loading = true;
    this.loansService.moveToRequests(this.currentUser.token, REQUEST_ID)
      .subscribe(loan => {
        if(loan.status==false){
          //this.showMessage.emit({message:'Unable to perform request'})
          this.showError('Unable to perform request')
        }else{
          this.closeOverlay();
          this.router.navigate(['/loan', REQUEST_ID]);
        }
        
      });
  }
}
