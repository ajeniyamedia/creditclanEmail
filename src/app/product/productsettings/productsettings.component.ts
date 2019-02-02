import { Component, OnInit, ViewContainerRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { DataService, StorageService } from '../../_services/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-productsettings',
  templateUrl: './productsettings.component.html',
  styleUrls: ['./productsettings.component.css']
})
export class ProductsettingsComponent implements OnInit {
  guarantors = [
    { value: '1', display: 'Phone' },
    { value: '2', display: 'Home Address' },
    { value: '3', display: 'Work Information' },
    { value: '4', display: 'Bank Account' },
    { value: '5', display: 'Repayment Card' },
    { value: '6', display: 'Social' },
  ];
  required_documents_guarantors: any;
  guarantor_requirements = {
    guarantor_requirements: [],
    SEND_GUARANTOR_INVITES: false,
    GUARANTOR_TERMS_AND_CONDITIONS: ''
  }
  product = {
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
  companyaccounts: any;
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
  public contract = {
    MUST_ACCEPT_CONTRACT: false,
    SEND_CONTRACT_DOCS: false,
    REQUEST_FOR_BVN: false,
    REQUEST_FOR_CARD: false,
    REQUEST_FOR_ACCOUNT: false,
    ENABLE_CONTRACT_SIGNATURE: false,
    ADJUST_CONTRACT_DATE: false,
    NOTIFY_CONTRACT_ACCEPTED: false,
    CONTRACT_ACCEPTED_EMAIL: '',
    REQUEST_FOR_DIRECT_DEBIT: false,
    product_id: ''
  }
  public others = {
    mustprovidestaffnumber: false,
    musttprovidelocation: false,
    validate_work_email: false,
    PEOPLE_CUSTOMERS_ID: ''
  }
  public mobile = {
    mustnotifyaccountofficer: '1',
    validate_work_email: false,
    notificationemail: '',
    customerconfirmsemailafterregisteration: false,
    shouldthecustomerporvidebvnaftersigningup: false,
    shouldthebvnbevalidatedrealtime: false,
    checkifuserhasvalidatedbvn: false,
    checkifuserhasvalidatedemail: false,
    mustprovideselfie: false,
    mustprovideloanpurpose: false,
    addreferralcode: false,
    nextofkin: false,
    education: false,
    social: false,
    homeaddress: false,
    proofofaddress: false,
    workinfo: false,
    companylist: false,
    personalexpense: false,
    financialrecords: false,
    nooffinancial: '0',
    accountcard: '0',
    guarantor: false,
    guarantorcount: '0',
    documentrefresh: '0',
    loan_product_id: '0',
    GPS_RETRY: '3',
    ENABLE_GEOTAGGING: false,
    SEND_NEW_CUSTOMER_REGISTERED: false,
    SEND_NEW_CUSTOMER_REGISTERED_EMAIL: '',
    skipphoneconfirmation: false,
    product_id: ''
  }
  public tc = {
    product_id: '',
    TERMS_AND_CONDITIONS: '',
    INCLUDE_TERMS_IN_CONTRACT: ''
  }
  public fee_settings = {
    FEE_TYPE: '0',
    FEE_PERCENT_VALUE: '0',
    FEE_FLAT_VALUE: '0',
    FEES_ACCOUNT: '0',
    CARD_REQUEST_FEE: '0'
  }
  public ol = {
    product_id: '',
    OFFER_LETTER: ''
  }
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '5rem',
    minHeight: '7rem',
    placeholder: 'Enter your text here',
    translate: 'no',
    width: "100%",
    minWidth: "100%"
  };
  company_interest = {
    product_id: '',
    REQUEST_RATE: '6',
    REQUEST_RATE_PERIOD_ID: '2',
    INTEREST_RATE_TYPE_ID: '1',
    REPAYMENT_TYPE_ID: '1',
    INSTALLMENT_FREQUENCY: '2',
    RP_SET_TYPE: '1',
    MONTHLY_PERIOD: '1',
    LOAN_INTEREST_TYPE: ''
  }
  notify = {
    NOTIFY: false,
    NOTIFY_EMAIL: '',
    PEOPLE_CUSTOMERS_ID: ''
  }
  states: any;
  lgas: any;
  sectors:any;
  occupations:any;
  marital_statuses:any;
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
  public accountcards = [
    { value: '0', display: 'None' },
    { value: '1', display: 'Card' },
    { value: '2', display: 'Bank Account' },
    { value: '3', display: 'Both' }
  ];
  required_documents: any;
  constructor(public route: ActivatedRoute,
    protected customersSrvc: CustomersService,
    protected constants: ConstantsService,
    public DataService: DataService, public router: Router,
    public toastr: ToastrService, vcr: ViewContainerRef,
    public storageService: StorageService,
    public productService: ProductsService) {
    this.currentUser = this.storageService.read<any>('currentUser');
  }

  // Load the basic information on navigation to this page
  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.getProductSettings(params["id"]);

    });

  }
  changeFrequency(event) {
    if (event.target.value === '1') {
      this.company_interest.REPAYMENT_TYPE_ID = '3';
    }
  }
  saveOFFrom(event) {
    this.saveFee(event.value, event.valid);
  }
  saveFee(value, valid) {

    this.loading = true;
    this.productService.saveFee(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }

  changeDuration(d, T) {

    if (T === 2) {
      this.interest_duration = this.loan_durations[d]["INTEREST_DURATION"];
      this.company_interest.LOAN_INTEREST_TYPE = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];
      this.company_interest.REQUEST_RATE_PERIOD_ID = this.loan_durations[d]["LOAN_INTEREST_DURATION_ID"];

    }

  }

  // load and reload functions
  getProductSettings(product_id) {

    this.productService.getProductSettings(product_id, this.currentUser.token).subscribe(data => {
      this.required_documents = data.required_documents;
      this.companyaccounts = data.accounts.a;
      this.product = data.product;
      this.contract.MUST_ACCEPT_CONTRACT = data.contract.MUST_ACCEPT_CONTRACT;
      this.contract.SEND_CONTRACT_DOCS = data.contract.SEND_CONTRACT_DOCS;
      this.contract.REQUEST_FOR_ACCOUNT = data.contract.REQUEST_FOR_ACCOUNT;
      this.contract.REQUEST_FOR_BVN = data.contract.REQUEST_FOR_BVN;
      this.contract.REQUEST_FOR_CARD = data.contract.REQUEST_FOR_CARD;
      this.contract.ENABLE_CONTRACT_SIGNATURE = data.contract.ENABLE_CONTRACT_SIGNATURE;
      this.contract.ADJUST_CONTRACT_DATE = data.contract.ADJUST_CONTRACT_DATE;
      this.contract.NOTIFY_CONTRACT_ACCEPTED = data.contract.NOTIFY_CONTRACT_ACCEPTED;
      this.contract.CONTRACT_ACCEPTED_EMAIL = data.contract.CONTRACT_ACCEPTED_EMAIL;
      this.contract.REQUEST_FOR_DIRECT_DEBIT = data.contract.REQUEST_FOR_DIRECT_DEBIT;
      this.contract.product_id = product_id;
      this.company_interest.INSTALLMENT_FREQUENCY = data.company_interest.INSTALLMENT_FREQUENCY;
      this.company_interest.INTEREST_RATE_TYPE_ID = data.company_interest.INTEREST_RATE_TYPE_ID;
      this.company_interest.MONTHLY_PERIOD = data.company_interest.MONTHLY_PERIOD;
      this.company_interest.REPAYMENT_TYPE_ID = data.company_interest.REPAYMENT_TYPE_ID;
      this.company_interest.REQUEST_RATE = data.company_interest.REQUEST_RATE;
      this.company_interest.REQUEST_RATE_PERIOD_ID = data.company_interest.REQUEST_RATE_PERIOD_ID;
      this.company_interest.RP_SET_TYPE = data.company_interest.RP_SET_TYPE;
      this.company_interest.product_id = product_id;


      this.mobile.mustprovideselfie = data.mobile.mustprovideselfie;
      this.mobile.nextofkin = data.mobile.nextofkin;
      this.mobile.education = data.mobile.education;
      this.mobile.social = data.mobile.social;
      this.mobile.homeaddress = data.mobile.homeaddress;
      this.mobile.proofofaddress = data.mobile.proofofaddress;
      this.mobile.workinfo = data.mobile.workinfo;
      this.mobile.personalexpense = data.mobile.personalexpense;
      this.mobile.accountcard = this.accountcards[data.mobile.accountcard].value;
      this.mobile.guarantor = data.mobile.guarantor;
      this.mobile.guarantorcount = data.mobile.guarantorcount;
      this.mobile.validate_work_email = data.mobile.validate_work_email;


      this.tc.product_id = product_id;
      this.tc.TERMS_AND_CONDITIONS = data.product.TERMS_AND_CONDITIONS;
      this.tc.INCLUDE_TERMS_IN_CONTRACT = data.product.INCLUDE_TERMS_IN_CONTRACT;

      this.ol.product_id = product_id;
      this.ol.OFFER_LETTER = data.product.OFFER_LETTER;

      this.mobile.product_id = product_id; 

      this.required_documents_guarantors = data.required_documents_guarantors;
      this.guarantor_requirements.guarantor_requirements = data.product.GUARANTOR_REQUIREMENTS;
      this.guarantor_requirements.SEND_GUARANTOR_INVITES = data.product.SEND_GUARANTOR_INVITES;
      this.guarantor_requirements.GUARANTOR_TERMS_AND_CONDITIONS = data.product.GUARANTOR_TERMS_AND_CONDITIONS;

      this.fee_settings.FEE_TYPE = data.fees.FEE_TYPE;
      this.fee_settings.FEE_PERCENT_VALUE = data.fees.FEE_PERCENT_VALUE;
      this.fee_settings.FEE_FLAT_VALUE = data.fees.FEE_FLAT_VALUE;
      this.fee_settings.CARD_REQUEST_FEE = data.fees.CARD_REQUEST_FEE;
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
  saveTC(value, valid) {
    this.loading = true;
    this.productService.saveTCSettings(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  saveOL(value, valid) {
    this.loading = true;
    this.productService.saveOLSettings(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        this.showSuccess(data.message);
      });
  }
  saveCompanyInterest(value, is_valid) {
    this.loading = true;
    this.productService.saveInterest(this.company_interest, this.currentUser.token).subscribe(data => {
      this.loading = false;
      if (data.status === true) {
        this.showSuccess(data.message)
      } else {
        this.showError(data.message)
      }

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
    this.productService.saveMobile(this.currentUser.token, value, this.required_documents)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
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
  saveContract(value, valid) {

    this.loading = true;
    this.productService.saveContract(this.currentUser.token, value)
      .subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  isGuarantorRequirementAvailable(OCCUPATION_ID, index) {

    if (this.guarantor_requirements.guarantor_requirements.indexOf(OCCUPATION_ID) > -1) {
      this.guarantors[index]["checked"] = true
      return true;
    } else {
      return false;
    }
  }
  saveGuarantorRequirements(value, valid) {

    this.loading = true;
    this.productService.saveGuarantorRequirements(this.currentUser.token, value, this.sectors, this.occupations, this.marital_statuses, this.states, this.guarantors, this.guarantor_requirements, this.required_documents_guarantors)
      .subscribe(data => {
        this.loading = false;
        if (data.status === '1') {
          this.showSuccess(data.message)
        } else {
          this.showError(data.message)
        }
      });
  }
  checkGuarantorRequirement(event, index) {
    this.guarantors[index]["checked_"] = event;

  }
}
