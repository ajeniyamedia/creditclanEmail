import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, StorageService } from '../_services/index';
import { DataService, OptionsserviceService, LoansService } from '../_services/index';

@Component({
  selector: 'app-loancheque',
  templateUrl: './loancheque.component.html',
  styleUrls: ['./loancheque.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoanchequeComponent implements OnInit {

  public loading = false;
  @Input('parentRouteId') parentRouteId: number;
  @Input('sub') sub: any;
  @Input('sub_summary') sub_summary: any;
  public currentUser: any;
  loan: any;
  cheques: any;
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
      this.loansService.getLoan(this.currentUser.token, this.parentRouteId)
        .subscribe(loan => {
          this.loan = loan;
          this.cheques = loan.cheques;
        });
    });
  }
  saveCheques() {
    this.loading = true;
    this.loansService.saveLoanCheques(this.currentUser.token, this.parentRouteId, this.cheques)
      .subscribe(analysis => {
        this.loading = false;
        this.loanAnalysis()

      });
  }

}
