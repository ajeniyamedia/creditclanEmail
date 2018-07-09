import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, DataService, CustomerService, AuthenticationService, StorageService, LoansService, OperationsService } from '../../_services/index'; 
import { Router } from '@angular/router';
import { LoancontractComponent } from '../../loancontract/loancontract.component'; 
import { IMyDpOptions } from 'mydatepicker';
import { IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyInputFocusBlur, IMyMarkedDate, IMyDate, IMySelector } from 'mydatepicker'; 
import { ToastrService } from 'ngx-toastr';
declare var swal: any;

@Component({
  selector: 'app-statementdetails',
  templateUrl: './statementdetails.component.html',
  styleUrls: ['./statementdetails.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatementdetailsComponent implements OnInit {
  repayment:any;
  initiate_recollection=false;
  dont_queue_payments=false;
  finalBreaking=false;
  platformwallet:any;
  security_question:any;
  state:any;
  disburse:any;
  done = false; 
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    height: '34px',
    width: '100%',
    dateFormat: 'yyyy-mm-dd',
    openSelectorTopOfInput: false,
  };
  post_action='6';
  public trans:any;
  public selDate: IMyDate = { year: 0, month: 0, day: 0 };
  public is_done="0";
  public parentRouteId: number;
  public loading = false;
  public sub='7';
  public subb:any;
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
  public IS_PEER_TO_PEER: any;
  public ADDED_TO_PAYMENT_QUEUE: any;
  public editContract = false;
  loan_approvals = 0;
  public loan: any;
  public overlayOpen = false;
  queue_disbursement = '0';
  break_loan = false;
  public applyMethod = { '1': 'Backend', '2': 'USSD', '3': 'Web' };
  viewing_loan = false;
  rolling_back_payment = false;
  childModal = { location: '', data: {} };
  loan_viewed: any;
  view_state='0';
  dontshownext: any;
  overlayType = '0';
  kyc_request = {
    KYC_COMMENTS:'',
    KYC_TYPE_ONE:false,
    KYC_TYPE_TWO:false,
    
  }
  pickup = {
    KYC_COMMENTS:'', 
    PICKUP_ADDRESS_TYPE:"1",
    CUSTOM_PICKUP_ADDRESS:""
    
  }
  loan_statement = {
    ddlDocList:1,
    ddlAddHeader:'0',
    ddlAddSignature:'0',
    ddlSendDateOption:'1',
    txtSendDate:'',
    ddlEmailReceiver:'0'
  }
  email_reminder = { 
    ddlSendDateOption:'1',
    txtSendDate:'',
    ddlEmailReceiver:'0',
    message:''
  }
  sms_reminder = { 
    ddlSendDateOption:'1',
    txtSendDate:'',
    ddlEmailReceiver:'0',
    message:''
  }
  doctypes:any;
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '5rem',
    minHeight: '7rem',
    placeholder: 'Enter your text here',
    translate: 'no',
    width:"100%",
    minWidth:"100%"
  };
  result:any;
  constructor(public operationsService:OperationsService,public toastr: ToastrService, vcr: ViewContainerRef,private DataService: DataService, 
    public router: Router, public route: ActivatedRoute, public loansService: LoansService, public storageService: StorageService) {
    this.DataService.onGetData.subscribe(res => {
      if (res) {
        this.overlayOpen = true
      }
    }) 
    this.DataService.onViewLoan.subscribe(res => {

      this.overlayOpen = false;
      if (res.from == '2') {
        this.getApp();
      }
    })
    this.DataService.onCancelPayment.subscribe(res => {
        this.break_loan = false;
        this.finalBreaking = false;
        this.dont_queue_payments = false;
    })
    this.DataService.onInitiateRecollection.subscribe(res=>{
     
      this.initiate_recollection = true;
      this.repayment = res;
    })
    this.DataService.onBreakingLoan.subscribe(res => {
       this.break_loan = true
       this.loan_viewed=res;
       this.finalBreaking = false;
    })

    // Catches requests from children on the modal to open.
    this.DataService.onOpenLoanChildModal.subscribe(res => {
       this.loading = false;
       this.is_done='0'
       this.done = false;
       this.childModal = res;
       
    })
    this.DataService.onMakePaymentFromStatement.subscribe(res => {
      
      this.viewing_loan = true
      this.loan_viewed = this.parentRouteId;
      this.view_state = '7';
      this.dontshownext = '1';
    })
    this.DataService.onRollbackPaymentFromStatement.subscribe(res => {
       
      this.rolling_back_payment = true
      this.trans = res.data.trans; 
      this.loan = res.data.loan;
    })
  }
  paymentHasBeenProcessedFinally(event){
    this.break_loan = false;
    this.finalBreaking = false;
    this.DataService.paymentHasBeenProcessedFinally.emit(event)
  }
  openThePaymentForFinalBreaking(event){
    
    this.finalBreaking = true;
    this.disburse = event.disbursement;
    this.security_question = event.security_question;
  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
    console.log(event)
  }
  openForFinalPayment(event){
    this.viewing_loan = false;
    this.dont_queue_payments = true;
     this.disburse = event.disbursement;
     this.security_question = event.security_question;
  }
  showError(message) {
    this.toastr.error(message, 'Error');
  }
  showMessage(event){
    if(event.type=="success"){
      this.showSuccess(event.message)
    }
    if(event.type=="error"){
      this.showError(event.message)
    }
  }
  closeOverlay() {
    this.viewing_loan = false;
    this.rolling_back_payment = false;
  }
  checkLevel(sector, event, index) {
    
    this.doctypes[index]["checked"] = event;
    
  }
  acceptBorrowerContract(){
    this.loading = true;
    this.loansService.acceptContract(this.currentUser.token, this.loan.REQUEST_ID)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  }
  sendBVN(){
    this.loading = true;
    this.loansService.sendBVNRequest(this.currentUser.token, this.loan.REQUEST_ID)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  }
  requestCard(){
    this.loading = true;
    this.loansService.sendCardRequest(this.currentUser.token, this.loan.REQUEST_ID)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  }
  confirmBankAccount(){

    this.loading = true;
    this.loansService.sendAccountConfirmationRequest(this.currentUser.token, this.loan.REQUEST_ID)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  }
  sendContract(){
    this.loading = true;
    this.loansService.sendContractDocumentRequest(this.currentUser.token, this.loan.REQUEST_ID)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  }
  deleteRequest(){
    this.loading = true;
    this.loansService.sendDeleteRequest(this.currentUser.token, this.loan.REQUEST_ID, null)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
      this.closeChildModal();
      
    });
    this.router.navigate['../../requests/pending'];
  }
  // Closes the modal opened by onOpenChildModal event
  closeChildModal() {
    this.childModal.location = '';
    this.break_loan = false;
    this.dont_queue_payments = false;
    this.initiate_recollection = false;
  }
  closeChildModal_(event) {
    this.childModal.location = '';
    //this.break_loan = false;
    if(event.post_action=='edit_contract'){
      this.post_action = '8'
      this.loan.REQUEST_ID = event.request_id;
      this.sub = event.is_top_up;
    }
  }
  
  sendKYCRequest(){
    this.loading = true;
    this.loansService.sendKYCRequest(this.currentUser.token, this.loan.REQUEST_ID,this.kyc_request)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  }
  sendDocsRequest(){
    this.loading = true;
    this.loansService.sendDocumentPickupRequest(this.currentUser.token, this.loan.REQUEST_ID,this.pickup,this.doctypes)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  }
  // Broadcast confirmtion to publish on loan market
  confirmPublish(request_id) {
    this.closeChildModal();
    this.DataService.onConfirmaLoanToMarket.emit({ 'request_id': request_id });
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
  cancelContract(){
    this.closeChildModal();
    this.DataService.onConfirmCancelContract.emit();
  }
  // Broadcast confirmation of offer placement for lender
  confirmOffer(form_data) {
    this.closeChildModal();
    this.DataService.onConfirmMakeOffer.emit({ 'form_data': form_data });
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
    this.pickup.PICKUP_ADDRESS_TYPE='1'
    let d: Date = new Date();

        this.selDate = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        };
  }
  sendTheStatement(){
    this.loan_statement.ddlEmailReceiver = "1";
    this.sendLoanStatement();
  }
  previewTheStatement(){
    this.loan_statement.ddlEmailReceiver = "0";
    this.sendLoanStatement();
  }
  previewTheEmailReminder(){
    this.email_reminder.ddlEmailReceiver = "1";
    this.sendEmailReminder();
  }
  sendForCancelAutoDebit(){
    this.loading = true;
    this.loansService.sendForCancelAutoDebit(this.currentUser.token, this.loan.REQUEST_ID)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  } 
  sendForReactivateAutoDebit(){
    this.loading = true;
    this.loansService.sendForReactivateAutoDebit(this.currentUser.token, this.loan.REQUEST_ID)
    .subscribe(data => {
      this.loading=false;
      this.is_done='1';
    });
  } 
  sendTheEmailReminder(){
    this.email_reminder.ddlEmailReceiver = "0";
    this.sendEmailReminder();
  }
  sendEmailReminder(){
    this.currentUser = this.storageService.read<any>('currentUser');
    this.subb = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.operationsService.sendEmailReminder(this.currentUser.token, this.parentRouteId, this.email_reminder)
        .subscribe(result => {
          this.result = result;
          if(result.status==true){
            this.done = true;
            this.showMessage(result.data.message)
          }else{
            this.showError(result.data.message)
          }
        });
    });
  }
  previewTheSMSReminder(){
    this.sms_reminder.ddlEmailReceiver = "1";
    this.sendSMSReminder();
  }
  sendTheSMSReminder(){
    this.sms_reminder.ddlEmailReceiver = "0";
    this.sendSMSReminder();
  }
  sendSMSReminder(){
    this.currentUser = this.storageService.read<any>('currentUser');
    this.subb = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.operationsService.sendSMSReminder(this.currentUser.token, this.parentRouteId, this.sms_reminder)
        .subscribe(result => {
          this.result = result;
          if(result.status==true){
            this.done = true;
            this.showMessage(result.data.message)
          }else{
            this.showError(result.data.message)
          }
        });
    });
  }
  sendLoanStatement(){
    this.currentUser = this.storageService.read<any>('currentUser');
    this.subb = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.operationsService.sendLoanStatement(this.currentUser.token, this.parentRouteId, this.loan_statement)
        .subscribe(result => {
          this.result = result;
          if(result.status==true){
            this.done = true;
            this.showMessage(result.data.message)
          }else{
            this.showError(result.data.message)
          }
        });
    });
  }
  getApp() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.subb = this.route.params.subscribe(params => {
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
          this.loan = loans.loan
        });
    });
  }
  ngOnDestroy() {
    this.subb.unsubscribe();
  }
  closeApproving() {
    console.log(10)
    this.open_approval = false;
    this.rejecting = false;
    this.approving = false;
  }
  approveRequest() {

    this.open_approval = true;
    this.approving = true;
  }

  confirmRejectRequest() {
    this.childModal = { location: 'confirm_reject_request', data: {} };
  }
  confirmedRejectRequest() {
    this.closeChildModal();
    this.rejectRequest();
  }
  rejectRequest() {
    this.open_approval = true;
    this.rejecting = true;
  }
  rejectThisRequest(isValid: boolean, f: any) {
    this.loading = true;
    //if (!isValid) return;
    this.subb = this.route.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.rejectThisRequest(this.currentUser.token, this.model_r)
        .subscribe(loans => {
          this.closeApproving;
          this.loading = false;
          this.canDoApproval = loans.status;
          this.approvals_queue = loans.approvals_queue;
          this.level = loans.level;
          this.prev_levels = loans.prev_levels;
        });
    });
  }
  approveThisRequest(isValid: boolean, f: any) {
    this.loading = true;
    //if (!isValid) return;
    this.subb = this.route.params.subscribe(params => {
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
            this.getApp();
          } else {
            if(loans.message){
              swal({
                title: "Approval",
                text: loans.message,
                type: "error"
              });
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
    this.subb = this.route.params.subscribe(params => {
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
            swal({
              title: "Disbursement",
              text: "Added to payment queue.",
              type: "success"
            });
          } else {


            if (loans.action == 'Dismiss') {
              swal({
                title: "Disbursement",
                text: loans.message,
                type: "error"
              });
              this.closeApproving();
            } else {
              swal({
                title: 'Disbursement',
                text: loans.message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: loans.action,
                cancelButtonText: 'Cancel'
              }).then(function() {

                swal(
                  'Deleted!',
                  'Your imaginary file has been deleted.',
                  'success'
                )
              }, function(dismiss) {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                  swal(
                    'Cancelled',
                    '',
                    'error'
                  )
                }
              })
            }
          }
        });
    });
  }
}
