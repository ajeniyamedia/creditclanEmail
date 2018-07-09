import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../_services/index'; 

@Component({
  selector: 'app-changeproduct',
  templateUrl: './changeproduct.component.html',
  styleUrls: ['./changeproduct.component.css']
})
export class ChangeproductComponent implements OnInit {

  @Input('master') masterName: string;
  public loading = false;
  public model = { LOAN_PURPOSE_CHANGE: 0, LOAN_PRODUCT_ID_CHANGE: 0, REQUEST_ID: '' };
  public loan_products: any[];
  public currentUser: any;
  public loan_purpose = [{ value: '1', display: 'Retail' }, { value: '2', display: 'Commercial' }, { value: '9', display: 'CP' },
  { value: '10', display: 'Lease' }, { value: '11', display: 'Staff' }];
  constructor(public storageService: StorageService, public optionsService: OptionsserviceService, public loansService: LoansService) { }

  ngOnInit() {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  changeLoanProducts(event) {
    this.loansService.getLoanProducts(this.currentUser.token, event).subscribe(loan_products => this.loan_products = loan_products);

  }
  changeALoanProduct() { 
    this.loading = true;
    this.model.REQUEST_ID = this.masterName;
    this.loansService.changeLoanProduct(this.currentUser.token, this.model)
      .subscribe(loan => {
        window.location.reload();
      });
  }
}
