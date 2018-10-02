import { Component, OnInit, ViewContainerRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { DataService, StorageService } from '../../_services/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {
  days = new Array(31)
  loading = false;
  deleting = false;
  enable_peer = '0'
  customers: any;
  openedTab: any;
  sub: any;
  mainSection = true;
  showEmptyState = false;
  count = '0';
  interest_duration = "Per Month";
  currentUser: any
  public others = {
    mustprovidestaffnumber: false,
    musttprovidelocation: false,
    validate_work_email:false,
    PEOPLE_CUSTOMERS_ID: ''
  }
  public mobile = {
    mustprovideselfie: false,
    mustprovideloanpurpose: false,
    nextofkin: false,
    education: false,
    homeaddress: false,
    proofofaddress: false,
    workinfo: false,
    personalexpense: false,
    PEOPLE_CUSTOMERS_ID: '',
    shouldthecustomerporvidebvnaftersigningup: false,
    shouldthebvnbevalidatedrealtime: false,
    checkifuserhasvalidatedbvn: false,
    skipphoneconfirmation: false,
    customerconfirmsemailafterregisteration: false
  }
  company_interest = {
    PEOPLE_CUSTOMERS_ID: '',
    REQUEST_RATE: '6',
    REQUEST_RATE_PERIOD_ID: '2',
    INTEREST_RATE_TYPE_ID: '1',
    REPAYMENT_TYPE_ID: '1',
    INSTALLMENT_FREQUENCY: '2',
    RP_SET_TYPE: '1',
    MONTHLY_PERIOD: '1',
    LOAN_INTEREST_TYPE: '',
    REPAYMENT_DAY: '',
    COMPANY_DISBURSEMENT: 0
  }
  notify = {
    NOTIFY: false,
    NOTIFY_EMAIL: '',
    PEOPLE_CUSTOMERS_ID: ''
  }
  company_approval = {
    ENABLE_COMPANY_APPROVAL: false,
    PEOPLE_CUSTOMERS_ID: ''
  }
  public loan_durations = [{ "LOAN_INTEREST_DURATION_ID": '1', "LOAN_DURATION": "Days", "INTEREST_DURATION": "Per Day", "ADJECTIVAL": "Daily", "ABBREV": "d" },
  { "LOAN_INTEREST_DURATION_ID": '2', "LOAN_DURATION": "Months", "INTEREST_DURATION": "Per Month", "ADJECTIVAL": "Monthly", "ABBREV": "Mo" },
  { "LOAN_INTEREST_DURATION_ID": '3', "LOAN_DURATION": "Years", "INTEREST_DURATION": "Per Year", "ADJECTIVAL": "Yearly", "ABBREV": "Yr" },
  { "LOAN_INTEREST_DURATION_ID": '4', "LOAN_DURATION": "Weeks", "INTEREST_DURATION": "Per Week", "ADJECTIVAL": "Weekly", "ABBREV": "Wk" }]
    ;
  approve = {
    "NAME": '',
    'EMAIL': '',
    'PEOPLE_CUSTOMERS_ID': ''
  }
  start = '0';
  customerPreview = { 'corporate': {}, 'individual': {} };
  approvals: any;
  constructor(public route: ActivatedRoute,
    protected customersSrvc: CustomersService,
    protected constants: ConstantsService,
    public DataService: DataService, public router: Router,
    public toastr: ToastrService, vcr: ViewContainerRef,
    public storageService: StorageService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  // Load the basic information on navigation to this page
  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.getCompanyInterest(params["id"]);

    });

  }
  changeFrequency(event) {
    if (event.target.value === '1') {
      this.company_interest.REPAYMENT_TYPE_ID = '3';
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

    this.customersSrvc.getCompanyInterest({ company_id: company_id }).subscribe(data => {
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


      this.notify.NOTIFY = data.notify.NOTIFY;
      this.notify.NOTIFY_EMAIL = data.notify.NOTIFY_EMAIL;
      this.notify.PEOPLE_CUSTOMERS_ID = data.notify.PEOPLE_CUSTOMERS_ID;

      this.company_approval.ENABLE_COMPANY_APPROVAL = data.company_approval.ENABLE_COMPANY_APPROVAL;
      this.company_approval.PEOPLE_CUSTOMERS_ID = data.company_approval.PEOPLE_CUSTOMERS_ID;
      this.approve.PEOPLE_CUSTOMERS_ID = data.notify.PEOPLE_CUSTOMERS_ID;
      this.approvals = data.approvals;


      this.mobile.mustprovideselfie = data.mobile.mustprovideselfie;
      this.mobile.nextofkin = data.mobile.nextofkin;
      this.mobile.education = data.mobile.education;
      this.mobile.homeaddress = data.mobile.homeaddress;
      this.mobile.proofofaddress = data.mobile.proofofaddress;
      this.mobile.workinfo = data.mobile.workinfo;
      this.mobile.personalexpense = data.mobile.personalexpense;
      this.mobile.shouldthecustomerporvidebvnaftersigningup = data.mobile.shouldthecustomerporvidebvnaftersigningup;
      this.mobile.shouldthebvnbevalidatedrealtime = data.mobile.shouldthebvnbevalidatedrealtime;
      this.mobile.checkifuserhasvalidatedbvn = data.mobile.checkifuserhasvalidatedbvn;
      this.mobile.checkifuserhasvalidatedbvn = data.mobile.checkifuserhasvalidatedbvn;
      this.mobile.customerconfirmsemailafterregisteration = data.mobile.customerconfirmsemailafterregisteration;
      this.mobile.skipphoneconfirmation = data.mobile.skipphoneconfirmation;
      this.mobile.PEOPLE_CUSTOMERS_ID = data.notify.PEOPLE_CUSTOMERS_ID;
      this.mobile.mustprovideloanpurpose = data.mobile.mustprovideloanpurpose;

      this.others.mustprovidestaffnumber = data.others.mustprovidestaffnumber;
      this.others.musttprovidelocation = data.others.musttprovidelocation;
      this.others.validate_work_email = data.others.validate_work_email;
      this.others.PEOPLE_CUSTOMERS_ID = data.notify.PEOPLE_CUSTOMERS_ID;
    });

  }
  saveNewCompanyApproval(value, valid) {
    this.loading = true;
    this.customersSrvc.saveNewCompanyApproval(this.approve, this.currentUser.token).subscribe(data => {
      this.loading = false;
      this.showSuccess('Request Successful')
      this.approvals = data.company_approvals;
    });
  }
  saveCompanyInterest(value, is_valid) {
    this.loading = true;
    this.customersSrvc.saveCompanyInterest(this.company_interest, this.currentUser.token).subscribe(data => {
      this.loading = false;
      this.showSuccess('Request Successful')

    });

  }
  saveRequestNotify(value, is_valid) {
    this.loading = true;
    this.customersSrvc.saveCompanyNotify(this.notify, this.currentUser.token).subscribe(data => {
      this.loading = false;
      this.showSuccess('Request Successful')

    });
  }
  saveEnableApproval(value, valid) {
    this.loading = true;
    this.customersSrvc.saveEnableApproval(this.company_approval, this.currentUser.token).subscribe(data => {
      this.loading = false;
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
  deleteCompanyApprovals(approval) {
    this.loading = true;
    this.deleting = true;
    this.customersSrvc.deleteCompanyApprovals(approval, this.currentUser.token).subscribe(data => {
      this.loading = false;
      this.deleting = false;
      this.showSuccess('Request Successful')
      this.approvals = data.company_approvals;
    });
  }
  saveMobileApplication(value, valid) {
    this.loading = true;
    this.customersSrvc.saveMobileApplication(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  saveCompanyDetails(value, valid) {
    this.loading = true;
    this.customersSrvc.saveCompanyDetails(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  nextRecords(records) {

  }
  prevRecords(records) {

  }




}
