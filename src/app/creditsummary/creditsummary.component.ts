import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, LoansService, AuthenticationService, StorageService } from '../_services/index';
import { User } from '../_models/index';

@Component({
  selector: 'app-creditsummary',
  templateUrl: './creditsummary.component.html',
  styleUrls: ['./creditsummary.component.css']
})
export class CreditsummaryComponent implements OnInit {

  public currentUser: any;
  public loading = true;
  public loans = [];
  public filters = { "token": "" }
  public count = 0;
  public remaining = [];
  constructor(public fb: FormBuilder, public loansService: LoansService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');

  }

  ngOnInit() {
    this.getLoans();

  }

  getLoans() {
    this.filters.token = this.currentUser.token;
    this.loansService.getLoansSummary(this.filters)
      .subscribe(loans => {
        this.loans = loans.loans;
        this.count = loans.count;
        this.remaining = loans.remaining;
        this.loading = false;
      });
  }

}
