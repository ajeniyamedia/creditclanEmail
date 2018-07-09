import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { OptionsserviceService, UserService, LoansService, AuthenticationService, StorageService } from '../_services/index';
import { User } from '../_models/index';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  public searchView = false;
  public loading = true;
  public currentUser: any;
  public investments: any;
  otherClosed = true;
  secOpen = '0';
  miniSearch = false;
  public durations = [
    { display: '0 - 1', checked: false, min: 0, max: 30 },
    { display: '0 - 3', checked: false, min: 31, max: 90 },
    { display: '4 - 6', checked: false, min: 91, max: 180 },
    { display: '7 - 12', checked: false, min: 181, max: 365 },
    { display: '1+ Years', checked: false, min: 366, max: 3650 }
  ];
  public statuses = [
    { value: '2', display: 'Portfolio' },
    { value: '3', display: 'Historical' }
  ];
  magic_filter = { funding: '100', token: '', min: 0, max: 10000000, loan_status: this.statuses[0].value, searchText: '', ratings_one: false, ratings_two: false, ratings_three: false, ratings_four: false, ratings_five: false, funding_amount_one: 1, funding_amount_two: 1, funding_amount_three: false, funding_status_contract_created: false, funding_status_applied: false, funding_status_funded: false, funding_status: false, amount: false, approval_level: false, rating: false, sector: false, date: false };
  constructor(public optionsService: OptionsserviceService, public fb: FormBuilder, public loansService: LoansService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  ngOnInit() {
    this.getInvestments();
  }

  openSec(sec) {
    this.otherClosed = true;
    this.secOpen = sec;
  }
  getInvestments() {
    this.loansService.getInvestments(this.currentUser.token, this.magic_filter)
      // this.loansService.getLoans(this.magic_filter)
      .subscribe(result => {
        this.loading = false;
        this.investments = result;
      });
  }
  searchForLoans(){
    this.getInvestments();
  }
}
