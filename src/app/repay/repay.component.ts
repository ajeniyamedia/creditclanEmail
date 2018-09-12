import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ViewEncapsulation, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
import { DataService } from '../_services/data.service'
@Component({
  selector: 'app-repay',
  templateUrl: './repay.component.html',
  styleUrls: ['./repay.component.css']
})
export class RepayComponent implements OnInit {

  @Input('parentRouteId') parentRouteId: number;
  @Input('sub_summary') sub_summary = '0';
  @Input('external') external = false;
  @Output() hideFunctions = new EventEmitter();
  @Output() initiate_recollection = new EventEmitter();
  currentUser: any;
  public sub: any;
  loan: any;
  PEOPLE_RATING_ID = 0;
  registerPayment = false;
  open_approval = false;
  state: any;
  constructor(public DataService: DataService, public optionsService: OptionsserviceService,
    public router: Router, public route: ActivatedRoute, public loansService: LoansService,
    public customerService: CustomerService, public userService: UserService,
    public storageService: StorageService,
    public authService: AuthenticationService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.parentRouteId = route.snapshot.parent.params['id'];
    //console.log(this.parentRouteId)
    this.DataService.onMakePaymentFromStatement.subscribe(res => {
      this.parentRouteId = res;
      this.open_approval = true;
    })
    this.DataService.paymentHasBeenProcessedFinally.subscribe(res => {
      this.getStatement();

    })
  }
  initiateRecollection(repayment) {
    this.initiate_recollection.emit(repayment);
  }
  initiateStopRemitaCollection(repayment) {

  }
  getStatement() {
    this.loansService.getStatement(this.currentUser.token, this.parentRouteId, '2', '-1')

      .subscribe(loan => {
        this.state = loan;
        this.loan = loan.loan;
        this.PEOPLE_RATING_ID = loan.PEOPLE_RATING_ID;
        if (loan.loan.LOAN_STATUS == '5') {
          this.hideFunctions.emit();
        }
      });
  }
  ngOnInit() {
    this.getStatement()

  }
  open_schedule(request_id) {
    this.router.navigate(['/repay']);
  }
  open_payment(request_id) {
    this.router.navigate(['../payments/' + request_id]);
  }
  open_statement(request_id) {
    this.router.navigate(['../statement/' + request_id]);
  }
  open_contract(request_id) {
    this.router.navigate(['../loan', request_id]);
  }
  getTotal(key, schedule) {
    if (schedule === undefined || schedule === null) { } else {
      let total = 0;
      if (key === "OUTSTANDING_PRINCIPAL") {
        total = schedule.reduce(function (cnt, o) { return cnt + parseInt(o.OUTSTANDING_PRINCIPAL); }, 0);
      }
      if (key === "TERM_REPAYMENT") {
        total = schedule.reduce(function (cnt, o) { return cnt + parseInt(o.TERM_REPAYMENT); }, 0);
      }
      if (key === "HOW_MUCH_PAID") {
        total = schedule.reduce(function (cnt, o) { return cnt + parseInt(o.HOW_MUCH_PAID); }, 0);
      }
      if (key === "HOW_MUCH_REMAINING") {
        total = schedule.reduce(function (cnt, o) { return cnt + parseInt(o.HOW_MUCH_REMAINING) }, 0);
      }
      if (key === "INTEREST_REPAYMENT") {
        total = schedule.reduce(function (cnt, o) { return cnt + parseInt(o.INTEREST_REPAYMENT); }, 0);
      }
      return total;
    }
    //

  }
  initiateSendDebitInstruction(repayment) {
    this.DataService.initiateDebitInstruction.emit({ repayment: repayment, location: 'initiate_direct_debit' });
  }
  initiateCheckDebitInstruction(repayment) {
    this.DataService.initiateCheckDebitInstruction.emit({ repayment: repayment, location: 'initiate_direct_debit_check' });
  }
  initiateCancelDebitInstruction(repayment) {
    this.DataService.initiateDebitInstructionCancel.emit({ repayment: repayment, location: 'initiate_direct_debit_cancel' });
  }
}
