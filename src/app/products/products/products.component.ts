import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService, StorageService, LoansService, DecisionService } from '../../_services/index';
import { OptionsserviceService } from '../../_services/optionsservice.service';
import { ProductsService } from '../../_services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  currentUser: any;
  count: 0
  addingProduct = false;
  loading = false;
  public product = {
    LOAN_TYPE: '0',
    LOAN_CURRENCY: '0',
    LOAN_DURATION_TYPE: '2',
    LOAN_INTEREST_TYPE: '2',
    LOAN_PRODUCT_ID: '0',
    REPAYMENT_TYPE_ID: '3',
    LOAN_SUBTYPE_ID: '',
    LOAN_AMOUNT: '0',
    MAX_AMOUNT: '0',
    LOAN_DURATION: '1',
    MAX_LOAN_DURATION: '12',
    LOAN_INTERVAL: '1',
    DURATION_INTERVAL: '1',
    DAYS_PER_YEAR: '365',
    LOAN_TITLE: '',
    LOAN_DESCRIPTION: '',
    INTEREST_RATE_TYPE_ID: '0',
    LOAN_INTEREST: '0',
    INSTALLMENT_FREQUENCY: '0',
    RP_SET_TYPE: '0',
    PREFERRED_OCCUPATION_SECTOR: [],
    PREFERRED_BORROWER_OCCUPATION: [],
    BASE_DURATION_TYPE: '2',
    MIN_LOAN_DURATION_DAYS: '1',
    MAX_LOAN_DURATION_DAYS: '30',
    ENABLE_LOAN_INTEREST_ON_AMOUNT: false,
    LOAN_INTEREST_AMOUNT: '0',
    LOAN_INTEREST_ON_AMOUNT: '0',
    LOAN_INTEREST_ON_AMOUNT_TYPE: '1',
    ENABLE_FLOOR_INTEREST_RATE: false,
    MAX_FLOOR_DURATION: '1',
    FLOOR_INTEREST_RATE: '0',
    MUST_ACCEPT_CONTRACT: false,
    INCREMENT_AFTER_FLOOR: false,
    FLOOR_INCREMENTAL_VALUE: 0,

  }
  countries: any;

  public max_loan_duration = 'Months';
  loan_duration = 'Month';
  deletingProduct = false;
  enablingProduct = false;
  is_done = '0';
  loan_product_id = '0';
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": '1', "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": '2', "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": '3', "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": '4', "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }];
  loan_currency = 'NGN';
  constructor(public toastr: ToastrService, public productsService: ProductsService,
    public loansService: LoansService, public optionsService: OptionsserviceService,
    private router: Router, public storageService: StorageService,
    public operationsService: OperationsService,
    public decisionService: DecisionService) {
    this.currentUser = this.storageService.read<any>('currentUser');


  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  ngOnInit() {
    this.optionsService.getCountries().subscribe(countries => {
      this.countries = countries;

    });
    this.getProducts();
  }
  getProducts(){
    this.productsService.getLoanProducts(this.currentUser.token)
      .subscribe(data => {

        this.products = data.products;
        this.count = data.count;
      });
  }
  deleteProduct(LOAN_PRODUCT_ID) {
    this.deletingProduct = true;
    this.loan_product_id = LOAN_PRODUCT_ID;
  }
  saveProduct(value, valid) {
    //this.router.navigate(['/product/', 1]);
    this.loading = true;
    this.productsService.saveLoanProduct(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
          this.router.navigate(['/product/', data.id]);
        } else {
          this.showError(data.message)
        }
      });
    this.getProducts()
  }
  changeCurrency(c) {
    this.loan_currency = c.currency[0];
    this.product.LOAN_CURRENCY = c.callingCode[0];
  }
  changeDuration(d, T) {
    if (T === 1) {
      this.loan_duration = this.loan_durations[d]["LOAN_DURATION"];
      this.product.LOAN_DURATION_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }

  }
  changeMaxDuration(d, T) {

  }
  suspendLoanProduct(){
    this.loading = true;
    this.productsService.suspendLoanProduct(this.currentUser.token, this.loan_product_id,1)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
      this.getProducts()
  }
  enableLoanProduct(){
    this.loading = true;
    this.productsService.suspendLoanProduct(this.currentUser.token, this.loan_product_id,0)
      .subscribe(data => {
        this.loading = false;
        this.is_done = '1';
      });
      this.getProducts()
  }
}
