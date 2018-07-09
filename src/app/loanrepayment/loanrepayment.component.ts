import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../_services/index';
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loanrepayment',
  templateUrl: './loanrepayment.component.html',
  styleUrls: ['./loanrepayment.component.css']
})
export class LoanrepaymentComponent implements OnInit {

  public schedule: any;
  public parentRouteId: number;
  public sub: any;
  public loading = false;
  public currentUser: any;
  public status = false;
  constructor(public route: ActivatedRoute, public storageService: StorageService, 
    public optionsService: OptionsserviceService, public loansService: LoansService) {


  }

  ngOnInit() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanSchedule(this.currentUser.token, this.parentRouteId)
        .subscribe(repayments => {
          this.status = repayments.status
          if (repayments.status) {
            this.schedule = repayments.data;

          } else {

          }

        });
    });
  }
  getTotal(key,schedule){ 
    if(schedule===undefined){}else{
      let total=0;
      if(key==="INITIAL_PRINCIPAL"){
        total= schedule.reduce( function(cnt,o){ return cnt + parseFloat(o.INITIAL_PRINCIPAL); }, 0);
      }
      if(key==="PRINCIPAL_REPAYMENT"){
        total= schedule.reduce( function(cnt,o){ return cnt + parseFloat(o.PRINCIPAL_REPAYMENT); }, 0);
      } 
      if(key==="INTEREST_REPAYMENT"){
        total= schedule.reduce( function(cnt,o){ return cnt + parseFloat(o.INTEREST_REPAYMENT); }, 0);
      } 
      if(key==="FEES"){
        total= schedule.reduce( function(cnt,o){ return cnt + parseFloat(o.FEES) + parseInt(o.VAT_ON_FEES); }, 0);
      } 
      if(key==="TERM_REPAYMENT"){
        total= schedule.reduce( function(cnt,o){ return cnt + parseFloat(o.TERM_REPAYMENT); }, 0);
      } 
      return total;
    }
    //
     
  }
}
