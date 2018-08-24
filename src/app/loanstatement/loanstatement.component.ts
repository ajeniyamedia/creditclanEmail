import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, OptionsserviceService, UserService, CustomerService, AuthenticationService, StorageService, LoansService } from '../_services/index';
 

@Component({
  selector: 'app-loanstatement',
  templateUrl: './loanstatement.component.html',
  styleUrls: ['./loanstatement.component.css']
})
export class LoanstatementComponent implements OnInit {

  @Input('parentRouteId') parentRouteId: number;
  type_of_entry='-1';
  currentUser: any;
  public sub: any;
  loan: any;
  transactions = [];
  statment_type = "2";
  constructor(public DataService: DataService, public optionsService: OptionsserviceService, public router: Router, public route: ActivatedRoute, public loansService: LoansService, public customerService: CustomerService, public userService: UserService, public storageService: StorageService
    ) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.DataService.paymentHasBeenProcessedFinally.subscribe(res => {
      this.getStatement();
      
   })
  }

  ngOnInit() {
    this.getStatement();
  }
 
  eir_statement() {
    this.statment_type = "1";
    this.getStatement();
  }
  makeLoanPayment() {

    this.DataService.onMakePaymentFromStatement.emit(this.parentRouteId)
  }
  breakLoan() {
    this.DataService.onBreakingLoan.emit(this.parentRouteId)
  }
  initiateRollback(trans){
    this.DataService.onRollbackPaymentFromStatement.emit({'location': 'initiate_roll_back', data : {loan:this.loan,trans:trans}});
  }
  stopAutoDebit(){
    this.DataService.onOpenLoanChildModal.emit({'location': 'stop_auto_debit', data : this.loan});
  }
  startAutoDebit(){
    this.DataService.onOpenLoanChildModal.emit({'location': 'start_auto_debit', data : this.loan});
  }
  sendAccountStatement(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'send_account_statement', data : this.loan});
  }
  requestForCard(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'send_new_card', data : this.loan});
  }
  sendEmailReminder(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'send_email_reminder', data : this.loan});
  }
  sendSMSReminder(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'send_sms_reminder', data : this.loan});
	}
  getStatement() {
    this.sub = this.route.parent.params.subscribe(params => {
      
      this.parentRouteId = +params["id"];
      this.loansService.getStatement(this.currentUser.token, this.parentRouteId, this.statment_type, this.type_of_entry)

        .subscribe(loan => {
          this.loan = loan;
          this.transactions = loan.chart_account_transactions
          //this.calculateTotal(loan.chart_account_transactions)
        });
    });
  }
  calculateTotal(chart_account_transactions) {
    let bal = parseFloat(chart_account_transactions[0]["DEBIT"]);
    bal = bal - parseFloat(chart_account_transactions[0]["CREDIT"]);
    chart_account_transactions.map(function(element) {
      element["BALANCE"] = bal
      bal = bal + parseFloat(element["DEBIT"]);
      bal = bal - parseFloat(element["CREDIT"]);
      //this.transactions.push(element)
    });
    this.transactions = chart_account_transactions
  }
  open_schedule(request_id) {
    this.router.navigate(['../repayments/' + request_id]);
  }
  open_payment(request_id) {
    this.router.navigate(['../payments/' + request_id]);
  }
  open_statement(request_id) {
    this.statment_type = '1';
    this.getStatement();
  }
  open_contract(request_id) {
    this.router.navigate(['../loan', request_id]);
  }
  break_loan() {
    this.DataService.onBreakLoan.emit();
  }
}
