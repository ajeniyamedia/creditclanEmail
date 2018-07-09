import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-incomestatement',
  templateUrl: './incomestatement.component.html',
  styleUrls: ['./incomestatement.component.css']
})
export class IncomestatementComponent implements OnInit {

  public currentUser: any;
  public loading = false;
  public filter = { NEXT: '-1', DDATE: '', DDATE_: '', SHOW_ZERO_BALANCE: false, token: '' }
  public data: any;

  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.filter.token = this.currentUser.token
  }


  ngOnInit() {

  }

  getProfitLoss() {
    this.operationsService.getProfitLoss(this.currentUser.token, this.filter).subscribe(data => {

      this.data = data

    });
  }
}
