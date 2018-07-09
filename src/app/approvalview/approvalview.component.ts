import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ElementRef,ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, DataService,OperationsService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-approvalview',
  templateUrl: './approvalview.component.html',
  styleUrls: ['./approvalview.component.css']
})
export class ApprovalviewComponent implements OnInit {
  viewing = "default";
  @Input('loan') loan :any;
  @Input('queue_disbursement') queue_disbursement :any;
  @Input('loanapprovals') loanapprovals :any;
  @Input('pay_from_loan') pay_from_loan:any;
  
  @Input('prev_levels') prev_levels:any;
  loading=false;
  hasError=false;
  errorMessage="";
  public loanPurpose = { '1': 'Debt Consolidation', '2': 'Medical Expenses', '3': 'Business' };
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": 1, "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": 2, "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": 3, "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": 4, "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
  ;
  public applyMethod = { '1': 'USSD', '2': 'Mobile', '3': 'Back Office','4':'Back Office' };
  notesOpen = true;
  @Input('model_r') model_r = { ilo: 0, reject_reason: "", reject_action: "", approval_notes: "", reject_level: "", wtd: 0, request_id: "", level: "" };
  @Input('model_a') model_a = { chk_acts: [], past_one: 1, approval_all_waivers: 1, approval_all_checklist: 1, is_waiver_level: 0, has_waiver: 0, ilo: 0, istd: 0, approval_notes: "", wtd: 1, request_id: "", level: "" };
  public open_approval = false;
  public approving = false;
  public rejecting = false;
  public level: any; 
  public currentUser:any;
  constructor(public operationsService: OperationsService,private DataService: DataService, 
    public router: Router, public route: ActivatedRoute, public loansService: LoansService, public storageService: StorageService) {
      this.currentUser = this.storageService.read<any>('currentUser');
  }
 

  ngOnInit() {
    this.viewing = 'default';
    this.approving = false;
  }
  showView(sec) {
    this.viewing = sec;
  }
  openNotes(ID) {
    this.notesOpen = ID;
  }
  approveRequest(){
    this.approving = true;
    this.open_approval=true;
  }
  confirmRejectRequest(){
    this.rejecting = true;
    this.open_approval=true;
  }
  closeApproving() { 
    this.open_approval = false;
    this.rejecting = false;
    this.approving = false;
    this.viewing='default'
  }
  rejectThisRequest(isValid: boolean, f: any) {
     
    this.loading = true;
    this.model_r.request_id = this.loan.REQUEST_ID
    this.model_r.level = this.loan.APPROVAL_LEVEL
    this.loansService.rejectThisRequest(this.currentUser.token, this.model_r)
        .subscribe(loans => {
           
          this.loading = false;  
        });
  }
  approveThisRequest(isValid: boolean, f: any) {
    this.loading = true;
    this.loansService.approveThisRequest(this.currentUser.token, this.model_a)
        .subscribe(loans => {
          this.loading = false;
          if (loans.status==true) {
           
            this.loading = false;  
            this.loansService.getApprovalQueue(this.currentUser.token, this.loan.REQUEST_ID)
            .subscribe(response => {
              
              //this.approvals_queue = loans.approvals_queue;
              this.level = response.level;
              this.prev_levels = response.prev_levels;
              this.model_r.request_id = response.approvals_queue.REQUEST_ID;
              this.model_r.level = response.approvals_queue.LEVEL_ID;
              this.model_a.request_id = response.approvals_queue.REQUEST_ID;
              this.model_a.level = response.approvals_queue.LEVEL_ID;
              this.model_a.ilo = response.approvals_queue.ILO;
              this.model_a.istd = response.approvals_queue.ISTD;   
              this.queue_disbursement = response.queue_disbursement;
              this.pay_from_loan = response.pay_from_loan;
              
            });
          } else {
            if(loans.message){
              console.log(1)
             this.hasError = true;
             this.errorMessage = loans.message;
            }
          }
        });
  }
}
