import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ElementRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService, DataService, OperationsService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { ToastrService } from 'ngx-toastr';
import { LoancontractComponent } from '../loancontract/loancontract.component';
// import { AnimationService, AnimationBuilder } from 'css-animator';

@Component({
  selector: 'app-loandetails',
  templateUrl: './loandetails.component.html',
  styleUrls: ['./loandetails.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoandetailsComponent implements OnInit {
  NOTIFY_ALL_LENDERS = false;
  islarger = false;
  // private _animator: AnimationBuilder;
  enable_peer = '0';
  prev: any;
  next: any;
  public is_done = "0";
  public parentRouteId: number;
  public loading = false;
  public sub: any;
  public currentUser: any;
  public canDoApproval: false;
  public approvals_queue: any;
  public open_approval = false;
  public approving = false;
  public rejecting = false;
  public level: any;
  public prev_levels: any;
  public model_r = { ilo: 0, reject_reason: "", reject_action: "", approval_notes: "", reject_level: "", wtd: 0, request_id: "", level: "" };
  public model_a = { chk_acts: [], past_one: 1, approval_all_waivers: 1, approval_all_checklist: 1, is_waiver_level: 0, has_waiver: 0, ilo: 0, istd: 0, approval_notes: "", wtd: 1, request_id: "", level: "" };
  public other_docs = [
    {
      "display": "Valid ID Card",
      "value": '1',
      "checked": false
    },
    {
      "display": "Other ID Card",
      "value": '15',
      "checked": false
    },
    // {
    //   "display":"Driver's License",
    //   "value":'2',
    //   "checked":false
    // },
    // {
    //   "display":"Voter's Card",
    //   "value":'3',
    //   "checked":false
    // },
    // {
    //   "display":"Work Identity Card",
    //   "value":'4',
    //   "checked":false
    // },
    // {
    //   "display":"Other Identity Card",
    //   "value":'5',
    //   "checked":false
    // },
    {
      "display": "Payslips",
      "value": '6',
      "checked": false
    },
    {
      "display": "Bank Statements",
      "value": '7',
      "checked": false
    },
    {
      "display": "Employment Letter",
      "value": '8',
      "checked": false
    },
    {
      "display": "Purchase Order",
      "value": '9',
      "checked": false
    },
    {
      "display": "Invoices",
      "value": '10',
      "checked": false
    },
    {
      "display": "Certificate of Incorporation",
      "value": '11',
      "checked": false
    },
    {
      "display": "Company Profile",
      "value": '12',
      "checked": false
    },
    {
      "display": "Allotment of Shares",
      "value": '13',
      "checked": false
    },
    {
      "display": "Particulars of Directors",
      "value": '14',
      "checked": false
    },
    {
      "display": "Work ID Card",
      "value": '16',
      "checked": false
    },
    {
      "display": "Utility Bill",
      "value": '17',
      "checked": false
    },
  ]
  public editContract = false;
  public IS_PEER_TO_PEER: any;
  public ADDED_TO_PAYMENT_QUEUE: any;
  loan_approvals = 0;
  public loan: any;
  public overlayOpen = false;
  queue_disbursement = '0';
  pay_from_loan = '0';
  break_loan = false;
  public applyMethod = { '1': 'USSD', '2': 'Mobile', '3': 'Back Office', '4': 'Back Office' };
  viewing_loan = false;
  childModal = { location: '', data: {} };
  loan_viewed: any;
  view_state = '0';
  dontshownext: any;
  overlayType = '0';
  kyc_request = {
    KYC_COMMENTS: '',
    KYC_TYPE_ONE: false,
    KYC_TYPE_TWO: false,
    KYC_PACKAGE: ''
  }
  financials_request = {
    HOW_MANY_MONTHS: '',
    BANK_STATEMENTS: false,
    PAYSLIPS: false
  }
  guarantors_request = {
    HOW_MANY_GUARANTORS: '',
  }
  pickup = {
    KYC_COMMENTS: '',
    PICKUP_ADDRESS_TYPE: "1",
    CUSTOM_PICKUP_ADDRESS: "",
    PICKUP_PACKAGE: ''
  }
  rejection = {
    MESSAGE: '',
    SEND_REJECTION_MAIL: false
  }
  reopen = {
    MESSAGE: '',
    SEND_REOPEN_MAIL: false
  }
  doctypes: any;
  dbAnalysisScore = {
    profile: 0,
    address: 0,
    income: 0,
    work: 0,
    guarantor: 0,
    account: 0,
    education: 0,
    call_log: 0,
    linkedln: 0
  };
  disburse: any;
  overlayOpenPay = false;
  overlayOpenPayConfirm = false;
  security_question = "";
  canDisburse = false;
  analysisModalView: any = "calculate";
  sub_profile_analysis: any;
  sub_address_analysis: any;
  sub_income_analysis: any;
  sub_work_analysis: any;
  sub_guarantor_analysis: any;
  sub_account_analysis: any;
  sub_education_analysis: any;
  sub_call_log_analysis: any;
  sub_linkedln_analysis: any;
  sumAnalytics: any = 0;
  sumDetailsScore: any = 0;
  fqScore: any;
  socialAnalysis = true;
  magic_filter: any = {
    profile: 0,
    address: 0,
    income: 0,
    work: 0,
    guarantor: 0,
    account: 0,
    education: 0,
    call_log: 0,
    linkedln: 0
  };
  constructor(private toastr: ToastrService, private _elementRef: ElementRef,
    private authService: AuthenticationService,
    public operationsService: OperationsService, private DataService: DataService,
    public router: Router, public route: ActivatedRoute, public loansService: LoansService, public storageService: StorageService) {

    if (!this.authService.canViewModule('1,2,3,5,1026')) {
      this.router.navigate(['../unauthorized']);
    }
    this.enable_peer = this.storageService.read<any>('enable_peer_to_peer');
    this.DataService.onGetData.subscribe(res => {
      if (res) {
        this.overlayOpen = true
      }
    })
    // this._animator = animationService.builder();
    this.DataService.onViewLoan.subscribe(res => {

      this.overlayOpen = false;
      if (res.from == '2') {
        this.getApp();
      }
    })
    this.DataService.onBreakingLoan.subscribe(res => {
      this.break_loan = true
    })

    // Catches requests from children on the modal to open.
    this.DataService.onOpenLoanChildModal.subscribe(res => {
      this.rejection.MESSAGE = '';
      this.rejection.SEND_REJECTION_MAIL = false;
      this.reopen.MESSAGE = '';
      this.reopen.SEND_REOPEN_MAIL = false;
      this.islarger = false;
      this.kyc_request.KYC_TYPE_ONE = false;
      this.kyc_request.KYC_TYPE_TWO = false;
      this.kyc_request.KYC_COMMENTS = '';
      this.pickup.PICKUP_ADDRESS_TYPE = '1';
      this.pickup.KYC_COMMENTS = '';
      this.financials_request.BANK_STATEMENTS = false;
      this.financials_request.PAYSLIPS = false;
      this.financials_request.HOW_MANY_MONTHS = '3';
      this.pickup.CUSTOM_PICKUP_ADDRESS = '';
      this.loading = false;
      this.is_done = '0'
      this.childModal = res;
      if (res.location == 'request_docs_mod') {
        this.doctypes = res.docpickups
      }
      if (res.location == 'request_to_get_paid') {
        this.loan = res.data
      } else {
        this.loan = res.data

      }
      if (res.location == 'customer-analysis-slider') {
        this.magic_filter.account = parseFloat(res.data.set_analytics.set_account);
        this.magic_filter.profile = parseFloat(res.data.set_analytics.set_profile);
        this.magic_filter.address = parseFloat(res.data.set_analytics.set_address);
        this.magic_filter.income = parseFloat(res.data.set_analytics.set_income);
        this.magic_filter.work = parseFloat(res.data.set_analytics.set_work);
        this.magic_filter.guarantor = parseFloat(res.data.set_analytics.set_guarantor);
        this.magic_filter.education = parseFloat(res.data.set_analytics.set_education);
        this.magic_filter.call_log = parseFloat(res.data.set_analytics.set_call_log);
        this.magic_filter.linkedln = parseFloat(res.data.set_analytics.set_linkedln);
        this.analysisModalView = "calculate";
        this.dbAnalysisScore.profile = parseFloat(res.data.profile);
        this.dbAnalysisScore.address = parseFloat(res.data.address);
        this.dbAnalysisScore.account = parseFloat(res.data.account);
        this.dbAnalysisScore.income = parseFloat(res.data.income);
        this.dbAnalysisScore.work = parseFloat(res.data.work);
        this.dbAnalysisScore.guarantor = parseFloat(res.data.guarantor);
        this.dbAnalysisScore.education = parseFloat(res.data.education);
        this.dbAnalysisScore.call_log = parseFloat(res.data.call_log_analysis);
        this.dbAnalysisScore.linkedln = parseFloat(res.social);

      }
    })
    this.DataService.onMakePaymentFromStatement.subscribe(res => {

      this.viewing_loan = true
      this.loan_viewed = this.parentRouteId;
      this.view_state = '7';
      this.dontshownext = '1';
    })
  }
  closeShowInterest(){
    
  }
  choosingKYC = false;
  chooseKYCPlan() {
    this.choosingKYC = true;
    this.islarger = true;
    // this._animator
    // .setType('fadeOutDown')
    // .setDelay(350)
    // .setDuration(600)
    // .hide(this._elementRef.nativeElement.querySelector('div.kycdetails'))
    // this._animator
    //   .setType('fadeInUp')
    //   .setDelay(350)
    //   .setDuration(700)
    //   .show(this._elementRef.nativeElement.querySelector('div.kycpackages'));

  }
  showAnalysisResult() {
    this.analysisModalView = 'result';
  }
  fqscorecalc() {
    this.DataService.onTweakScores.emit(this.magic_filter);
    this.sub_profile_analysis = this.dbAnalysisScore.profile * this.magic_filter.profile;

    this.sub_address_analysis = this.dbAnalysisScore.address * this.magic_filter.address;

    this.sub_income_analysis = this.dbAnalysisScore.income * this.magic_filter.income;

    this.sub_work_analysis = this.dbAnalysisScore.work * this.magic_filter.work;

    this.sub_guarantor_analysis = this.dbAnalysisScore.guarantor * this.magic_filter.guarantor;

    this.sub_account_analysis = this.dbAnalysisScore.account * this.magic_filter.account

    this.sub_education_analysis = this.dbAnalysisScore.education * this.magic_filter.education;

    this.sub_linkedln_analysis = this.dbAnalysisScore.linkedln * this.magic_filter.linkedln;

    this.sub_call_log_analysis = this.dbAnalysisScore.call_log * this.magic_filter.call_log;

    this.sumDetailsScore = this.sub_profile_analysis + this.sub_address_analysis + this.sub_income_analysis + this.sub_work_analysis + this.sub_guarantor_analysis + this.sub_account_analysis + this.sub_education_analysis + this.sub_call_log_analysis + this.sub_linkedln_analysis;
    this.sumAnalytics = this.magic_filter.profile + this.magic_filter.address + this.magic_filter.income + this.magic_filter.work + this.magic_filter.guarantor + this.magic_filter.account + this.magic_filter.education + this.magic_filter.call_log + this.magic_filter.linkedln;
    if (this.sumAnalytics == 0) {
      this.fqScore = 0;
    } else {
      this.fqScore = Math.round(this.sumDetailsScore / this.sumAnalytics);
    }
    this.showAnalysisResult()
  }

  saveAnlysisRequest() {
    this.loansService.saveFqscore(this.currentUser.token, this.fqScore, this.parentRouteId)
      .subscribe(data => {
        if (data.status === '1') {
          this.showSuccess(data.message);
          this.closeChildModal();
          this.DataService.onSaveFqscore.emit({ fqscore: this.fqScore })
        } else {
          this.showError(data.message)
        }
      });
  }

  socialAnalysisRequest() {
    this.loansService.saveSocialRequest(this.currentUser.token, this.socialAnalysis, this.parentRouteId)
      .subscribe(data => {
        if (data.status === '1') {
          this.showSuccess(data.message);
          this.closeChildModal()
        } else {
          this.showError(data.message)
        }
      });
  }

  updateProfilePercentage(slider, event, type) {
    if (type == 'profile') {
      this.magic_filter.profile = event.from;
      //this.sub_profile_analysis = this.statement.profile * this.magic_filter.profile;
    }

    if (type == 'address') {
      this.magic_filter.address = event.from;
      //this.sub_address_analysis = this.statement.address * this.magic_filter.address;
    }

    if (type == 'income') {
      this.magic_filter.income = event.from;
      // this.sub_income_analysis = this.statement.income * this.magic_filter.income;
    }

    if (type == 'work') {
      this.magic_filter.work = event.from;
      //  this.sub_work_analysis = this.statement.work * this.magic_filter.work;
    }

    if (type == 'guarantor') {
      this.magic_filter.guarantor = event.from;
      // this.sub_guarantor_analysis = this.statement.guarantor * this.magic_filter.guarantor;
    }

    if (type == 'account') {
      this.magic_filter.account = event.from;
      // this.sub_account_analysis = this.statement.account * this.magic_filter.account
    }

    if (type == 'education') {
      this.magic_filter.education = event.from;
      // this.sub_education_analysis = this.statement.education * this.magic_filter.education;
    }

    if (type == 'call_log') {
      this.magic_filter.call_log = event.from;
      //  this.sub_call_log_analysis = this.statement.call_log_analysis * this.magic_filter.call_log;
    }

  }



  calculateAnalysis() {
    this.analysisModalView = 'calculate';
  }

  choosePickupPlan() {
    // this.islarger = true;
    // this._animator
    // .setType('fadeOutDown')
    // .setDelay(350)
    // .setDuration(600)
    // .hide(this._elementRef.nativeElement.querySelector('div.pickupdetails'))
    // this._animator
    //   .setType('fadeInUp')
    //   .setDelay(350)
    //   .setDuration(700)
    //   .show(this._elementRef.nativeElement.querySelector('div.pickuppackages'));
  }
  closeOverlay() {
    this.viewing_loan = false
    this.overlayOpenPay = false
    this.overlayOpenPayConfirm = false
  }
  checkLevel(sector, event, index) {

    this.doctypes[index]["checked"] = event;

  }
  cancelPayment() {

  }
  checkWalletTransactionStatus() {
    this.loading = true;
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];

      this.loansService.checkWalletTStatus(this.currentUser.token, this.parentRouteId)
        .subscribe(loans => {
          this.loading = false;
          if (loans.status == "success") {
            if (loans.data.status == "completed") {
              this.showSuccess("Transaction has been disbursed");
              this.router.navigate(['/statement/', this.parentRouteId, 'schedule']);
            } else {

            }
          } else {

          }
        });
    });
  }
  doCheckWalletTransactionStatus() {
    //queue for disburse then pay
    this.loading = true;
    //if (!isValid) return;
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];

      this.loansService.queueForDisbursement(this.currentUser.token, this.parentRouteId)
        .subscribe(loans => {
          this.loading = false;
          if (loans.status) {
            //good to go
            this.disburse = loans.queue.result[0];
            this.overlayOpenPayConfirm = true;
          }
        });
    });
  }
  payBorrowerFromLoan() {
    //queue for disburse then pay
    this.loading = true;
    //if (!isValid) return;
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];

      this.loansService.queueForDisbursement(this.currentUser.token, this.parentRouteId)
        .subscribe(loans => {
          this.loading = false;
          if (loans.status) {
            //good to go
            this.disburse = loans.queue.result[0];

            this.overlayOpenPay = true;
          } else {


            if (loans.action == 'Dismiss') {
              // swal({
              //   title: "Disbursement",
              //   text: loans.message,
              //   type: "error"
              // });
              this.showError(loans.message)
              this.closeApproving();
            } else {
              this.showError(loans.message);
              // swal({
              //   title: 'Disbursement',
              //   text: loans.message,
              //   type: 'warning',
              //   showCancelButton: true,
              //   confirmButtonText: loans.action,
              //   cancelButtonText: 'Cancel'
              // }).then(function () {

              //   // swal(
              //   //   'Deleted!',
              //   //   'Your imaginary file has been deleted.',
              //   //   'success'
              //   // )
              // }, function (dismiss) {
              //   // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
              //   if (dismiss === 'cancel') {
              //     // swal(
              //     //   'Cancelled',
              //     //   '',
              //     //   'error'
              //     // )
              //     this.showError("Cancelled")
              //   }
              // })
            }
          }
        });
    });
  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }
  showError(msg) {
    this.toastr.error(msg);
  }
  acceptBorrowerContract() {
    this.loading = true;
    this.loansService.acceptContract(this.currentUser.token, this.loan.REQUEST_ID)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  acceptBorrowerGetPaid() {
    this.loading = true;
    this.loansService.acceptBorrowerGetPaid(this.currentUser.token, this.loan.REQUEST_ID)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  paymentHasBeenProcessedFinally(event) { 
    this.closeOverlay();
    this.router.navigate(['/statement/', this.loan.REQUEST_ID, 'schedule']);
  }
  sendBVN() {
    this.loading = true;
    this.loansService.sendBVNRequest(this.currentUser.token, this.loan.REQUEST_ID)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  sendForFinancialDocuments() {
    this.loading = true;
    this.loansService.sendForFinancialDocuments(this.currentUser.token, this.loan.REQUEST_ID, this.financials_request)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  sendForOtherDocuments() {
    this.loading = true;
    this.loansService.sendForOtherDocuments(this.currentUser.token, this.loan.REQUEST_ID, this.other_docs)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  sendForGuarantors() {
    this.loading = true;
    this.loansService.sendForGuarantors(this.currentUser.token, this.loan.REQUEST_ID, this.guarantors_request)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  requestCard() {
    this.loading = true;
    this.loansService.sendCardRequest(this.currentUser.token, this.loan.REQUEST_ID)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  requestGuarantorCard() {
    this.loading = true;
    this.loansService.requestGuarantorCard(this.currentUser.token, this.loan.data.guarantor.RG_ID)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  confirmBankAccount() {

    this.loading = true;
    this.loansService.sendAccountConfirmationRequest(this.currentUser.token, this.loan.REQUEST_ID)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  sendContract() {
    this.loading = true;
    this.loansService.sendContractDocumentRequest(this.currentUser.token, this.loan.REQUEST_ID)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  deleteRequest() {
    this.loading = true;
    this.loansService.sendDeleteRequest(this.currentUser.token, this.loan.REQUEST_ID, this.rejection)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
        this.closeChildModal();
        this.getApp();
        this.DataService.refreshPage.emit();
      });

  }
  // Closes the modal opened by onOpenChildModal event
  closeChildModal() {
    this.childModal.location = '';
    this.router.navigate['../../requests/pending'];
  }
  sendKYCRequest(KYC_PACKAGE) {
    this.kyc_request.KYC_PACKAGE = KYC_PACKAGE;
    this.loading = true;
    this.loansService.sendKYCRequest(this.currentUser.token, this.loan.REQUEST_ID, this.kyc_request)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  sendDocsRequest(PICKUP_PACKAGE) {
    this.pickup.PICKUP_PACKAGE = PICKUP_PACKAGE;
    this.loading = true;
    this.loansService.sendDocumentPickupRequest(this.currentUser.token, this.loan.REQUEST_ID, this.pickup, this.doctypes)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
  }
  // Broadcast confirmtion to publish on loan market
  confirmPublish(request_id) {
    this.closeChildModal();
    this.DataService.onConfirmaLoanToMarket.emit({ 'request_id': request_id, 'notify_all_lenders': this.NOTIFY_ALL_LENDERS });
  }

  // Broadcast confirmation of request from lender
  confirmAccept(lender_id) {
    this.closeChildModal();
    this.DataService.onConfirmAcceptOffer.emit({ 'lender_id': lender_id });
  }

  // Broadcast rejection of request from lender
  confirmReject(lender_id) {
    this.closeChildModal();
    this.DataService.onConfirmRejectOffer.emit({ 'lender_id': lender_id });
  }
  cancelContract() {
    this.closeChildModal();
    this.DataService.onConfirmCancelContract.emit();
  }
  // Broadcast confirmation of offer placement for lender
  confirmOffer(form_data) {
    this.closeChildModal();
    this.DataService.onConfirmLenderHasMadeOffers.emit({ 'form_data': form_data });
  }
  confirmOffer_(form_data) {
    this.closeChildModal();
    this.DataService.onConfirmLenderHasMadeOffers.emit({ 'form_data': form_data });
  }
  // Broadcast confirmation of removal of loan from market
  confirmRemoval(request_id) {
    this.closeChildModal();
    this.DataService.onConfirmRemoveLoan.emit({ 'request_id': request_id });
  }


  // Navigate to contact on close of 'send to market modal'
  gotoContract(request_id) {
    this.router.navigate(['/loan/', request_id, 'contract']);
    this.closeChildModal();
  }


  ngOnInit() {
    this.getApp()
    this.pickup.PICKUP_ADDRESS_TYPE = '1'
    this.getSecurityQuestion();
    if (this.authService.canViewModule('3')) {
      this.canDisburse = true;
    }
  }
  getSecurityQuestion() {
    this.operationsService.getSecurityQuestion(this.currentUser.token)
      .subscribe(data => {

        this.security_question = data.security_question.QUESTION;
      });
  }
  getApp() {
    this.currentUser = this.storageService.read<any>('currentUser');

    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getApprovalQueue(this.currentUser.token, this.parentRouteId)
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
          this.loan = loans.loan
          this.prev = loans.prev;
          this.next = loans.next;
          console.log(this.loan)
        });
    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  closeApproving() {
    console.log(10)
    this.open_approval = false;
    this.rejecting = false;
    this.approving = false;
  }
  open_loan(REQUEST_ID) {
    this.router.navigate(['/loan/', REQUEST_ID, 'contract']);
    this.DataService.borrowerChange.emit(REQUEST_ID);
  }
  approveRequest() {

    this.open_approval = true;
    this.approving = true;
  }

  confirmRejectRequest() {
    // this.childModal = { location: 'confirm_reject_request', data: this.loan };
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'delete_request_mod', data: this.loan });
  }
  confirmReopenRequest() {
    this.childModal = { location: 'confirm_reopen_request', data: this.loan };
  }
  confirmedRejectRequest() {
    this.closeChildModal();
    this.rejectRequest();
  }
  confirmedReopenRequest() {
    this.closeChildModal();
    this.reopenRequest();
  }
  reopenRequest() {

    this.loading = true;

    //if (!isValid) return;
    this.loansService.reopenRequest(this.currentUser.token, this.loan.REQUEST_ID, this.reopenRequest)
      .subscribe(loans => {
        this.closeApproving();
        this.loading = false;
        this.getApp();
        this.DataService.refreshPage.emit();
      });
  }
  rejectRequest() {
    this.open_approval = true;
    this.rejecting = true;
  }
  rejectThisRequest(isValid: boolean, f: any) {

    this.loading = true;
    this.model_r.request_id = this.loan.REQUEST_ID
    this.model_r.level = this.loan.APPROVAL_LEVEL
    //if (!isValid) return;
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.rejectThisRequest(this.currentUser.token, this.model_r)
        .subscribe(loans => {
          this.closeApproving();
          this.loading = false;
          this.getApp();
          this.DataService.refreshPage.emit();
        });
    });
  }
  approveThisRequest(isValid: boolean, f: any) {
    this.loading = true;
    //if (!isValid) return;
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];

      this.loansService.approveThisRequest(this.currentUser.token, this.model_a)
        .subscribe(loans => {
          this.loading = false;
          if (loans.status) {
            this.closeApproving();
            this.loading = false;
            this.getApp();
            // this.canDoApproval = loans.status;
            // this.approvals_queue = loans.approvals_queue;
            // this.level = loans.level;
            // this.prev_levels = loans.prev_levels;
            //window.location.reload();

            this.DataService.refreshPage.emit();
          } else {
            if (loans.message) {
              // swal({
              //   title: "Approval",
              //   text: loans.message,
              //   type: "error"
              // });
              this.showError(loans.message)
            }

            this.getApp();

            this.closeApproving();
          }
        });
    });
  }

  queueForDisbursement() {
    this.loading = true;
    //if (!isValid) return;
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];

      this.loansService.queueForDisbursement(this.currentUser.token, this.parentRouteId)
        .subscribe(loans => {
          this.loading = false;
          if (loans.status) {
            this.getApp()
            this.closeApproving();
            this.loading = false;
            this.ADDED_TO_PAYMENT_QUEUE = loans.ADDED_TO_PAYMENT_QUEUE;
            //this.DataService.onGetLoan.emit(loans.loan); 
            // swal({
            //   title: "Disbursement",
            //   text: "Added to payment queue.",
            //   type: "success"
            // });
            this.showSuccess("Added to payment queue")
          } else {


            if (loans.action == 'Dismiss') {
              // swal({
              //   title: "Disbursement",
              //   text: loans.message,
              //   type: "error"
              // });
              this.showError(loans.message);
              this.closeApproving();
            } else {
              this.showError(loans.message);
              // swal({
              //   title: 'Disbursement',
              //   text: loans.message,
              //   type: 'warning',
              //   showCancelButton: true,
              //   confirmButtonText: loans.action,
              //   cancelButtonText: 'Cancel'
              // }).then(function () {

              //   swal(
              //     'Deleted!',
              //     'Your imaginary file has been deleted.',
              //     'success'
              //   )
              // }, function (dismiss) {
              //   // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
              //   if (dismiss === 'cancel') {
              //     swal(
              //       'Cancelled',
              //       '',
              //       'error'
              //     )
              //   }
              // })
            }
          }
        });
    });
  }
}
