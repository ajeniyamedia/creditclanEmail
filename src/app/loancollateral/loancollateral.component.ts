import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, StorageService } from '../_services/index';
import { DataService, OptionsserviceService, LoansService } from '../_services/index';

@Component({
  selector: 'app-loancollateral',
  templateUrl: './loancollateral.component.html',
  styleUrls: ['./loancollateral.component.css']
})
export class LoancollateralComponent implements OnInit {

  public loading = false;
  @Input('parentRouteId') parentRouteId: number;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  public currentUser: any;
  loan: any;
  collaterals: any;
  constructor(private DataService: DataService, public route: ActivatedRoute, public storageService: StorageService, 
    public optionsService: OptionsserviceService, public loansService: LoansService) {



  }
  ngOnInit() {
    this.loanAnalysis();
  }

  loanAnalysis() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanCollateral(this.currentUser.token, this.parentRouteId)
        .subscribe(loan => {
          this.loan = loan.loan;
          this.collaterals = loan.collaterals;
          this.calculateTotal()
        });
    });
  }
  calculateTotal() {
    console.log(1)
    let current_est = 0;
    let est_depre = 0;
    for (var collateral of this.collaterals) {
      current_est += Number(collateral.EST_CURRENT_VALUE);
      est_depre += Number(collateral.EST_LIQUIDATION_VALUE);
    }
    this.loan.TOTAL_COLLATERAL_CURRENT_VALUE = current_est;
    this.loan.TOTAL_COLLATERAL_EST_LIQUIDATION_VALUE = est_depre;
  }
  calculateTotal_(event) {
    console.log(event)
    let current_est = 0;
    let est_depre = 0;
    for (var collateral of this.collaterals) {
      current_est += Number(collateral.EST_CURRENT_VALUE);
      est_depre += Number(collateral.EST_LIQUIDATION_VALUE);
    }
    this.loan.TOTAL_COLLATERAL_CURRENT_VALUE = current_est;
    this.loan.TOTAL_COLLATERAL_EST_LIQUIDATION_VALUE = est_depre;
  }
  saveCollaterals() {
    this.loading = true;
    this.loansService.saveCollaterals(this.currentUser.token, this.parentRouteId, this.collaterals, this.loan)
      .subscribe(analysis => {
        this.loading = false;
        this.loanAnalysis()

      });
  }

}
