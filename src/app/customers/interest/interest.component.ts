import { Component, OnInit,ViewContainerRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { DataService } from '../../_services/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {
  days = new Array(31)
  loading=false;
  enable_peer='0'
  customers:any;
  openedTab: any;
  sub:any;
  mainSection = true;
  showEmptyState=false;
  count='0';
  interest_duration="Per Month";
  constructor(public route: ActivatedRoute,
    protected customersSrvc: CustomersService,
    protected constants: ConstantsService,
    public DataService: DataService, public router: Router,public toastr: ToastrService, vcr: ViewContainerRef, ) {
     
  }
  company_interest = {
    PEOPLE_CUSTOMERS_ID:'',
    REQUEST_RATE:'6',
    REQUEST_RATE_PERIOD_ID:'2',
    INTEREST_RATE_TYPE_ID:'1',
    REPAYMENT_TYPE_ID:'1',
    INSTALLMENT_FREQUENCY:'2',
    RP_SET_TYPE:'1',
    MONTHLY_PERIOD:'1',
    LOAN_INTEREST_TYPE:'',
    REPAYMENT_DAY:'',
    COMPANY_DISBURSEMENT:0
  }
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": '1', "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": '2', "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": '3', "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": '4', "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
  ;
  start='0';
  customerPreview = { 'corporate': {}, 'individual': {} }; 
  // Load the basic information on navigation to this page
  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.getCompanyInterest(params["id"]);
      
    });

  }
  changeFrequency(event){
    if(event.target.value==='1'){
      this.company_interest.REPAYMENT_TYPE_ID='3';
    }
   }
  changeDuration(d, T) { 
    
    if (T === 2) {
      this.interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.company_interest.LOAN_INTEREST_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
      this.company_interest.REQUEST_RATE_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
      
    }
    
  }

  // load and reload functions
  getCompanyInterest(company_id) {

    this.customersSrvc.getCompanyInterest({company_id:company_id}).subscribe(data => {
      //this.customers = data;
      this.company_interest.PEOPLE_CUSTOMERS_ID = data.company_interest.PEOPLE_CUSTOMERS_ID;
      this.company_interest.INSTALLMENT_FREQUENCY = data.company_interest.INSTALLMENT_FREQUENCY;
      this.company_interest.INTEREST_RATE_TYPE_ID = data.company_interest.INTEREST_RATE_TYPE_ID;
      this.company_interest.MONTHLY_PERIOD = data.company_interest.MONTHLY_PERIOD;
      this.company_interest.REPAYMENT_TYPE_ID = data.company_interest.REPAYMENT_TYPE_ID;
      this.company_interest.REQUEST_RATE = data.company_interest.REQUEST_RATE;
      this.company_interest.REQUEST_RATE_PERIOD_ID = data.company_interest.REQUEST_RATE_PERIOD_ID;
      this.company_interest.RP_SET_TYPE = data.company_interest.RP_SET_TYPE;
      this.company_interest.REPAYMENT_DAY = data.company_interest.REPAYMENT_DAY;
      this.company_interest.COMPANY_DISBURSEMENT = data.company_interest.COMPANY_DISBURSEMENT;
      //this.DataService.onProfileNav.emit({ 'location': 'home_corporate', 'data': data });
      this.DataService.onProfileNav.emit({ 'location': 'home_corporate', 'data': data });
      
    });

  }
  saveCompanyInterest(value,is_valid){
    this.loading=true;
    this.customersSrvc.saveCompanyInterest(this.company_interest).subscribe(data => {
     this.loading =false
      //this.customers = data;
       this.showSuccess('Request Successful')
      
    });

  }
  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  showError(message) {
    this.toastr.error(message, 'Error');
  }
  showCustomerPreview(event, category, id) {

    event.preventDefault();

     // If the data is not loaded, then open it.
     if (this.customerPreview[category][id] == undefined) {
      this.openedTab = id;
      this.customerPreview[category][id] = { data: {} };
      this.customersSrvc.getCustomerPreview(category, id).subscribe(data => {
        this.customerPreview[category][id] = { data: data['cust'], funding: data['funding'], loans: data['loans'], wallet: data['wallet'] };
        console.log(this.customerPreview[category]);
      });
    } else {
      this.openedTab = id;
      return;
    }
  }


  nextRecords(records) {

  }
  prevRecords(records) {

  }




}
