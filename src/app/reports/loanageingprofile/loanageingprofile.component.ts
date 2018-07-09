import { Component, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService, OperationsService, AuthenticationService, StorageService } from '../../_services/index';

@Component({
  selector: 'app-loanageingprofile',
  templateUrl: './loanageingprofile.component.html',
  styleUrls: ['./loanageingprofile.component.css']
})
export class LoanageingprofileComponent implements OnInit {

  public currentUser: any;
  public loading = false;
  public filter = { token: '', NEXT: '0', index: '1', prev: '0', next: '20', CUSTOMER_ID: '', TYPE: '1' }
  public data: any;
  public acc_off: any;
  public investment_products: any;
  public people_customers: any;
  public types = [
    { value: "1", display: '0 - 30' },
    { value: "2", display: '31 - 60' },
    { value: "3", display: "61 - 90" },
    { value: "4", display: "91 - 180" },
    { value: "5", display: "181 - 360" },
    { value: "6", display: "1 - 2years" },
    { value: "7", display: "2  - 3years" },
    { value: "8", display: "3 - 4years" },
    { value: "9", display: "Over 4years" }
  ];
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
    this.getLoanAgeing()
  }

  getLoanAgeing() {
    this.operationsService.getLoanAgeing(this.currentUser.token, this.filter).subscribe(data => {
      // this.acc_off = data.accoff;
      // this.investment_products = data.investment_products;
      // this.people_customers=data.peoples;
      this.data = data
      this.filter.index = data.index;
      this.filter.prev = data.prev;
      this.filter.NEXT = data.next;

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
