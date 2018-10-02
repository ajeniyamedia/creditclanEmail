import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, StorageService } from '../_services/index';
import { DataService, OptionsserviceService, LoansService, OperationsService } from '../_services/index';

@Component({
  selector: 'app-loanaccts',
  templateUrl: './loanaccts.component.html',
  styleUrls: ['./loanaccts.component.css']
})
export class LoanacctsComponent implements OnInit {

  @Input('parentRouteId') loading = false;
  @Input('parentRouteId') parentRouteId: number;
  @Input('fromloan') fromloan = false;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  @Output('showDirectDebitHistoryOnAccount') showDirectDebitHistoryOnAccount = new EventEmitter();
  directdebitstatus = false;
  public currentUser: any;
  loan: any;
  accounts: any;
  account = {
    'bank_id': '',
    'account_name': '',
    'account_number': '',
    'is_verified': false,
    'i_certify': false,
  }
  nigerian_banks: any;
  addingBank = false;
  banks: any;
  constructor(private DataService: DataService,
    public route: ActivatedRoute,
    public storageService: StorageService,
    public optionsService: OptionsserviceService,
    public loansService: LoansService,
    public operationsService: OperationsService,
    public dataService: DataService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.dataService.onreloadAccountsAndCards.subscribe(res=>{
      this.loanAnalysis();
    })
  }
  ngOnInit() {
    this.loanAnalysis();
    this.operationsService.getNigerianBanks(this.currentUser.token).subscribe(nigerian_banks => this.nigerian_banks = nigerian_banks);
  }

  loanAnalysis() {
    this.currentUser = this.storageService.read<any>('currentUser');
    if (!this.fromloan) {
      this.sub = this.route.parent.params.subscribe(params => {
        this.parentRouteId = +params["id"];
        this.loansService.getLoanCardsAndAccounts(this.currentUser.token, this.parentRouteId)
          .subscribe(loan => {
            this.loan = loan.loan
            this.accounts = loan.cards;
            this.banks = loan.accounts;
          });
      });
    } else {
      this.loansService.getLoanCardsAndAccounts(this.currentUser.token, this.parentRouteId)
        .subscribe(loan => {
          this.loan = loan.loan;
          this.accounts = loan.cards;
          this.banks = loan.accounts;
        });
    }
  }

  addNewANewAccount() {

  }
  updateBank(value, valid) {

  }
  verify_error = false;

  verifyBankDetails() {
    this.loading = true;
    this.verify_error = false;
    this.operationsService.confirmBankAccounts(this.currentUser.token, this.account)
      .subscribe(status => {
        this.loading = false;

        if (status.status === 'success') {
          this.account.account_name = status.data.account_name;
          this.account.is_verified = true;
          this.account.i_certify = true;
        } else {
          this.account.is_verified = false;

          this.verify_error = true;
        }
      });
  }
  deleteCard(account_card_id, loan_id) {
    this.loading = true;
    this.operationsService.deleteConnectedCard(this.currentUser.token, account_card_id, loan_id)
      .subscribe(status => {
        this.loading = false;
        this.loanAnalysis();
      });
  }
  deleteAccount(account_card_id, loan_id) {
    this.loading = true;
    this.operationsService.deleteConnectedCard(this.currentUser.token, account_card_id, loan_id)
      .subscribe(status => {
        this.loading = false;
        this.loanAnalysis();
      });
  }
  setAsConnectedCard(loan_id, account_card_id) {
    this.loading = true;
    this.operationsService.setAsConnectedCard(this.currentUser.token, account_card_id, loan_id)
      .subscribe(status => {
        this.loading = false;
        this.loanAnalysis();
      });
  }
  setAsConnectedAccount(loan_id, account_card_id) {
    this.loading = true;
    this.operationsService.setAsConnectedAccount(this.currentUser.token, account_card_id, loan_id)
      .subscribe(status => {
        this.loading = false;
        this.loanAnalysis();
      });
  }
  setUpDirectDebitMandate(loan, acc) {
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'setup_debit_mandate_', loan: loan, acc: acc });
  }
  checkdirectdebitstatus(loan, acc) {
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'check_debit_mandate', loan: loan, acc: acc });
  }
  cancelDirectDebit(loan, acc) {
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'cancel_debit_mandate', loan: loan, acc: acc });
  }
  resendMandateLink(loan, acc) {
    this.DataService.onOpenLoanChildModal.emit({ 'location': 'resend_debit_mandate', loan: loan, acc: acc });
  }
  stopdirectdebitmandate(loan, acc) {
    this.DataService.stopDebitMandate.emit({ 'location': 'stop_direct_debit', loan: loan, acc: acc });
  }
  checkTransactionStatus(loan, acc) {
    this.showDirectDebitHistoryOnAccount.emit({ loan: loan, acc: acc });
  }
}
