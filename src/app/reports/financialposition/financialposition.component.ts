import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-financialposition',
  templateUrl: './financialposition.component.html',
  styleUrls: ['./financialposition.component.css']
})
export class FinancialpositionComponent implements OnInit {

  public currentUser: any;
  public loading = false;
  public filter = { token: '', DDATE: '', DDATE_: '', SHOW_ZERO_BALANCE: false }
  public data: any;

  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.filter.token = this.currentUser.token
  }


  ngOnInit() {
  }

  getBalanceSheet() {
    this.operationsService.getBalanceSheet(this.currentUser.token, this.filter).subscribe(data => {

      this.data = data

    });
  }
}
