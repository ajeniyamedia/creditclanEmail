import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../_services/index';
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loanapprovals',
  templateUrl: './loanapprovals.component.html',
  styleUrls: ['./loanapprovals.component.css']
})
export class LoanapprovalsComponent implements OnInit {

  public parentRouteId: number;
  public sub: any;
  public loading = false;
  public approvals: any[];
  public currentUser: any;
  public notesOpen = '0';
  constructor(public route: ActivatedRoute, public storageService: StorageService,
    public optionsService: OptionsserviceService, public loansService: LoansService) {


  }
  openNotes(ID) {
    this.notesOpen = ID;
  }
  ngOnInit() {

    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanApprovals(this.currentUser.token, this.parentRouteId)
        .subscribe(approvals => {
          this.approvals = approvals;
        });
    });
  }

}
