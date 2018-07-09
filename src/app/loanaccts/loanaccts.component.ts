import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, StorageService } from '../_services/index';
import { DataService, OptionsserviceService, LoansService, OperationsService } from '../_services/index';

@Component({
  selector: 'app-loanaccts',
  templateUrl: './loanaccts.component.html',
  styleUrls: ['./loanaccts.component.css']
})
export class LoanacctsComponent implements OnInit {

  public loading = false;
  @Input('parentRouteId') parentRouteId: number;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  public currentUser: any;
  loan: any;
  accounts: any;
  account= {
    'bank_id': '',
    'account_name': '',
    'account_number': '',
    'is_verified': false,
    'i_certify': false,
  }
  nigerian_banks: any;
  constructor(private DataService: DataService, 
    public route: ActivatedRoute, 
    public storageService: StorageService, 
    public optionsService: OptionsserviceService, 
    public loansService: LoansService,
    public operationsService:OperationsService) {
      this.currentUser = this.storageService.read<any>('currentUser');
  }
  ngOnInit() {
    this.loanAnalysis();
    this.operationsService.getNigerianBanks(this.currentUser.token).subscribe(nigerian_banks => this.nigerian_banks = nigerian_banks);
  }

  loanAnalysis() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanCardsAndAccounts(this.currentUser.token, this.parentRouteId)
        .subscribe(loan => {
          this.loan = loan.loan
          this.accounts = loan.cards;
        });
    });
  }
  addingBank = false;
  addNewANewAccount(){

  }
  updateBank(value, valid){

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
  deleteCard(account_card_id,loan_id){
    this.loading = true; 
    this.operationsService.deleteConnectedCard(this.currentUser.token, account_card_id, loan_id)
      .subscribe(status => { 
        this.loading = false;
        this.loanAnalysis();
      });
  }
  setAsConnectedCard(loan_id,account_card_id){
    this.loading = true; 
    this.operationsService.setAsConnectedCard(this.currentUser.token, account_card_id, loan_id)
      .subscribe(status => { 
        this.loading = false;
        this.loanAnalysis();
      });
  }
}
