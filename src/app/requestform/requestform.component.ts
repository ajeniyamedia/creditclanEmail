import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { DataService, OptionsserviceService, LoansService, StorageService, CustomerService, OperationsService } from '../_services/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})
export class RequestformComponent implements OnInit {
  request_bank:any;
  @Input('sub') sub = '0';
  @Input() selectedCustomer: any;
  public searchedCustomerResult: any;
  @Input() customerSelected = false;
  public searchString = "";
  searchForCustomer=false;
  request = {
    REQUEST_ID:'',
    PEOPLE_ID : 0,
    REQUEST_PRINCIPAL : '0',
    REQUEST_TENOR : '0',
    REQUEST_PERIOD_ID : '2',
    REQUEST_RATE : 3.5,
    REQUEST_RATE_PERIOD_ID : '2',
    LOAN_ID:'',
    REQUEST_CURRENCY_ID:1,
    CONNECTED_CARD_ID:'',
    CONNECTED_ACCOUNT_ID:'',
    LOAN_PRODUCT_ID:'',
    DISBURSEMENT_DATE:'',
    REPAYMENT_STARTED_WHEN:'',
    WHERE_FROM:2,
    PLATFORM_ID:'',
    DAYS_PER_YEAR:'',
    MONTHLY_PERIOD:'',
    TYPE_OF_CREDIT:2,
    INTEREST_RATE_TYPE_ID:'1',
    REPAYMENT_FREQUENCY:0,
    RP_SET_TYPE:'',
    REPAYMENT_TYPE_ID:'',
    MORATORIUM_PERIOD:0,
    MORATORIUM_TYPE:0,
    ALLOW_MORATORIUM:3,
    DO_NOT_COMPOUND:1,
    WHAT_HAPPENS_TO_PRINCIPAL:1,
    WHAT_HAPPENS_TO_INTEREST:1,
    FEES_UPFRONT_BACKEND:1,
    FEES_EXCLUDE_INCLUDE:1,
    FEE_TYPE:0,
    TOTAL_FLAT_FEES:0,
    TOTAL_PERCENTAGE_FEES:0,
    INSTALLMENT_FREQUENCY:0,
  }
  hasSelectedCustomer=false;
  countries:any;
  is_company_staff=false;
  company_id:any;
  currentUser:any;
  request_step='1';
  public loan_purpose = [{ value: '1', display: 'Retail' }, { value: '2', display: 'Commercial' }, { value: '9', display: 'CP' },
  { value: '10', display: 'Lease' }, { value: '11', display: 'Staff' }];
  public loan_purposes: any;
  public loan_currency = "NGN";
  public loan_duration = "Months";
  public interest_duration = "Per Month";
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": '1', "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": '2', "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": '3', "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": '4', "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
    ;
  loading = false;
  loan_product:any;
  appsettings:any;
  gender = [
    { value: 0, display: 'Male' },
    { value: 1, display: 'Female' }
  ];
  marital_status = [
    { value: 0, display: '' },
    { value: 1, display: 'Single' },
    { value: 2, display: 'Married' },
    { value: 3, display: 'Widowed' }
  ];

  id_means = [
    { value: 0, display: '' },
    { value: 1, display: 'International Passport' },
    { value: 2, display: 'Voters Id' },
    { value: 3, display: 'Work Id' },
    { value: 4, display: 'National Id' }
  ];
  relations = [
    { value: 0, display: '' },
    { value: 1, display: 'Father' },
    { value: 2, display: 'Mother' },
    { value: 3, display: 'Brother' },
    { value: 4, display: 'Sister' },
    { value: 5, display: 'Uncle' },
    { value: 6, display: 'Aunty' },
    { value: 7, display: 'Husband' },
    { value: 8, display: 'Wife' },
    { value: 9, display: 'Son' },
    { value: 10, display: 'Daughter' }
  ];
  edu_qua = [
    { value: 0, display: '' },
    { value: 1, display: 'Professor' },
    { value: 2, display: 'Ph D' },
    { value: 3, display: 'Masters' },
    { value: 4, display: 'B Sc' },
    { value: 5, display: 'NCE' },
    { value: 6, display: 'High School' },
    { value: 7, display: 'Primary School' }
  ];
  occupations:any;
  sectors:any;
  designations:any;
  nigerian_banks:any;
  showSuccess(msg) {
    this.toastr.success(msg);
  }
  showError(msg) {
    this.toastr.error(msg);
  }
  constructor(private DataService: DataService, public router: Router,
    public storageService: StorageService, public customerService: CustomerService,
    public optionsService: OptionsserviceService, public loansService: LoansService,
     private operationsService:OperationsService,
     private toastr: ToastrService) {
     
    this.is_company_staff = this.storageService.read<any>('is_company_staff');
    this.company_id = this.storageService.read<any>('company_id');
    
  }

  ngOnInit() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.initializeForm();
    this.optionsService.getCountries().subscribe(countries => this.countries = countries);
    this.optionsService.getOccupation(2).subscribe(sectors => this.sectors = sectors);
    this.optionsService.getOccupation(1).subscribe(sectors => this.occupations = sectors);
    this.optionsService.getOccupation(4).subscribe(sectors => this.designations = sectors);
    this.operationsService.getNigerianBanks(this.currentUser.token).subscribe(nigerian_banks => this.nigerian_banks = nigerian_banks);
  }
  selectCustomer(customer) {
    this.selectedCustomer = customer;
    this.customerSelected = true;
    this.searchForCustomer = false;
    this.request.PEOPLE_ID = customer.PEOPLE_CUSTOMERS_ID;
    this.hasSelectedCustomer = true
  }
  customerCreated(event){
    console.log(event)
    this.selectedCustomer = event.customer;
    this.customerSelected = true;
    this.searchForCustomer = false;
    this.request.PEOPLE_ID = event.customer.PEOPLE_ID;
    this.hasSelectedCustomer = true
    this.request_step = '1';
    this.request_bank = event.bank;
  }
  searchCustomers() {
    if (this.searchString == "") {
      this.searchedCustomerResult = {}
    } else {
      this.customerService.searchForCustomers(this.currentUser.token, this.searchString, '')
        .subscribe(customers => {
          this.searchedCustomerResult = customers
        });
    }

  }
  initializeForm(){
    this.loansService.initializeNewLoan(this.currentUser.token, this.company_id, this.is_company_staff)
        .subscribe(data => {

          this.request.LOAN_PRODUCT_ID = data.product.LOAN_PRODUCT_ID
          this.request.REQUEST_RATE = data.company.REQUEST_RATE;
          this.request.REQUEST_RATE_PERIOD_ID = data.company.REQUEST_RATE_PERIOD_ID;
          this.request.DAYS_PER_YEAR = data.product.DAYS_PER_YEAR;
          this.request.MONTHLY_PERIOD = data.company.MONTHLY_PERIOD;
          this.request.INTEREST_RATE_TYPE_ID = data.company.INTEREST_RATE_TYPE_ID;
          this.request.REPAYMENT_TYPE_ID = data.company.REPAYMENT_TYPE_ID;
          this.request.INSTALLMENT_FREQUENCY = data.company.INSTALLMENT_FREQUENCY
          this.request.RP_SET_TYPE = data.company.RP_SET_TYPE
          this.request.FEE_TYPE = data.company.FEE_TYPE;
          this.request.TOTAL_FLAT_FEES = data.company.TOTAL_FLAT_FEES
          this.request.TOTAL_PERCENTAGE_FEES = data.company.TOTAL_PERCENTAGE_FEES
          this.loan_product = data.product;
          this.appsettings = data.appsettings;
          this.request.REQUEST_PRINCIPAL='0'
          this.request.REQUEST_TENOR='0'
          this.request_bank = null;
          
    });
  }
  queueStraightForDisbursement(){
    this.loading = true;
    this.loansService.queueStraightForDisbursement(this.currentUser.token, this.request, this.selectedCustomer, this.loan_product, this.request_bank).subscribe(loan_request => {
      this.loading = false;
      if (loan_request.status === false) {
        this.showError("Customer has an active request");
      } else {
        this.request_step = '3';
        
      }


    });
  }
  new_request() {
    this.request_step = '1';
    this.selectedCustomer = [];
    this.searchedCustomerResult = [];
    this.customerSelected = false;
    this.searchForCustomer = true;
    this.loading = false;
    this.sub = '0';
    this.initializeForm();
  }
  changeDuration(d, T) {
    if (T === 1) {
      this.loan_duration = this.loan_durations[d]["LOAN_DURATION"];
      this.request.REQUEST_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
    }
    if (T === 2) {

      this.interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.request.REQUEST_RATE_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"]; 

    }

  }
  previewLoan() {
    this.loading = true;
    this.loansService.previewLoan(this.currentUser.token, this.request, this.selectedCustomer, this.loan_product).subscribe(loan_request => {
      this.loading = false;
      if (loan_request.status === false) {
        this.showError("Customer has an active request");
      } else {
        this.request = loan_request
        this.request_step = '2'

        this.loansService.getLoan_(this.currentUser.token, loan_request.REQUEST_ID)
          .subscribe(loan => {

            this.request = loan;
            if (this.request.REQUEST_RATE_PERIOD_ID == '1') {
              this.interest_duration = "Per Day"
            }
            if (this.request.REQUEST_RATE_PERIOD_ID == '2') {

              this.interest_duration = "Per Month"
            }
            if (this.request.REQUEST_RATE_PERIOD_ID == '3') {
              this.interest_duration = "Per Year"
            }
            if (this.request.REQUEST_RATE_PERIOD_ID == '4') {
              this.interest_duration = "Per Week"

            }
            if (loan.REQUEST_PERIOD_ID == 1) {
              this.loan_duration = "Days"
            }
            if (loan.REQUEST_PERIOD_ID == 2) {
              this.loan_duration = "Months"
            }
            if (loan.REQUEST_PERIOD_ID == 3) {
              this.loan_duration = "Years"
            }
            if (loan.REQUEST_PERIOD_ID == 4) {
              this.loan_duration = "Weeks"

            }

           
          });

      }


    });
  }
  newCustomer(){
    this.request_step = '100';
  }
}
