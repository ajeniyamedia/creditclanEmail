import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { DataService, OptionsserviceService, LoansService, StorageService } from '../_services/index';
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loanchecklist',
  templateUrl: './loanchecklist.component.html',
  styleUrls: ['./loanchecklist.component.css']
})
export class LoanchecklistComponent implements OnInit {

  view = 'main';
  public loading = false;
  public analysis: any;
  @Input('parentRouteId') parentRouteId: number;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  public currentUser: any;
  public yesno = [
    { value: '0', display: 'No' },
    { value: '1', display: 'Yes' }
  ];
  
  analysis_form = {
    is_card_provider: '0',
    is_bank_account_provider: '0', 
    is_contract_accepted: '0',
    is_bvn_done:'0',
    is_contract_sent:'0',
    account_officer:''
  }
  constructor(private DataService: DataService, public route: ActivatedRoute, public storageService: StorageService
    ,   public optionsService: OptionsserviceService, public loansService: LoansService) {
 

  }
  ngOnInit() {
    this.loanAnalysis();
  } 
  loanAnalysis() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoan(this.currentUser.token, this.parentRouteId)
        .subscribe(analysis => {  
          this.analysis_form.is_bvn_done=analysis.BVN_DONE
          this.analysis_form.is_bank_account_provider=analysis.CONNECTED_ACCOUNT_ID;
          this.analysis_form.is_card_provider = analysis.CONNECTED_CARD_ID;
          this.analysis_form.is_contract_accepted =  analysis.IS_ACCEPTED;
          this.analysis_form.is_contract_sent =  analysis.CONTRACT_DOC_SENT;
          if(analysis.IS_ACCEPTED==='1'){
            this.analysis_form.is_contract_sent = '1';
          }
          this.analysis_form.account_officer = analysis.ACCOUNT_MANAGER;
          this.analysis = analysis;
        });
    });
  } 
  sendBVN(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'send_bvn_mod', data : {}});
	}

	requestCard(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'request_card_mod', data : {}});
	}

	sendContract(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'send_contract_mod', data : {}});		
	}

	confirmAccount(){
		this.DataService.onOpenLoanChildModal.emit({'location': 'confirm_account_mod', data : {}});		
	}
}
