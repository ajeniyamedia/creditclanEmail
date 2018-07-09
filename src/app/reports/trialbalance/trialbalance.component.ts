import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-trialbalance',
  templateUrl: './trialbalance.component.html',
  styleUrls: ['./trialbalance.component.css']
})
export class TrialbalanceComponent implements OnInit {

  public currentUser: any;
  public loading = false;
  public filter = { token: '', DDATE: '', SHOW_ZERO_BALANCE: false }
  public data: any;

  constructor(public fb: FormBuilder, public operationsService: OperationsService, 
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.filter.token = this.currentUser.token;
  }
  ngOnInit() {
    //this.getTrialBalance()
  }
  getTrialBalance() {
    this.operationsService.getTrialBalance(this.currentUser.token, this.filter).subscribe(data => {

      this.data = data

    });
  }
}
