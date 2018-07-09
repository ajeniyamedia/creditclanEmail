import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../_services/index';
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loancomments',
  templateUrl: './loancomments.component.html',
  styleUrls: ['./loancomments.component.css']
})
export class LoancommentsComponent implements OnInit {

  public parentRouteId: number;
  public sub: any;
  public loading = false;
  public comments: any[];
  public loan: any;
  public currentUser: any;
  public notesOpen = 0;
  public c = { "IS_INV": "", "COMMENTS_FOR_": "", "COMMENT": "" };
  constructor(public route: ActivatedRoute, public storageService: StorageService, 
    public optionsService: OptionsserviceService, public loansService: LoansService) {


  }
  submitComment(f) {

  }
  ngOnInit() {

    this.currentUser = this.storageService.read<any>('currentUser');
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      this.loansService.getLoanComments(this.currentUser.token, this.parentRouteId)
        .subscribe(comments => {
          this.comments = comments.Posts;
          this.loan = comments.loan;
        });
    });
  }

}
