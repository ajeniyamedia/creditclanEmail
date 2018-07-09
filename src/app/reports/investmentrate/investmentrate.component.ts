import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-investmentrate',
  templateUrl: './investmentrate.component.html',
  styleUrls: ['./investmentrate.component.css']
})
export class InvestmentrateComponent implements OnInit {

  public currentUser: any;
  public loading = false;
  public filter = { token: '', NEXT: '0', index: '1', prev: '0', next: '20', CUSTOMER_ID: '', DDATE: '', DDATE_: '' }
  public data: any;
  public acc_off: any;
  public investment_products: any;
  public people_customers: any;
  constructor(public fb: FormBuilder, public operationsService: OperationsService, public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.filter.token = this.currentUser.token;
    this.operationsService.getOptionsForReport(this.currentUser.token).subscribe(data => {
      this.acc_off = data.accoff;
      this.investment_products = data.investment_products;
      this.people_customers = data.peoples;

    });
  }

  ngOnInit() {
    this.getInvestmentRateHistory();
  }
  getInvestmentRateHistory() {
    this.operationsService.getInvestmentRateHistory(this.currentUser.token, this.filter).subscribe(data => {
      this.data = data
      this.filter.index = data.index;
      this.filter.prev = data.prev;
      this.filter.next = data.next;
    });
  }
  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.filter.CUSTOMER_ID = value;
  }

}
