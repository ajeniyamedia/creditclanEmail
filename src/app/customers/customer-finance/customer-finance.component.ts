import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../_services/customers.service';
import { ConstantsService } from '../../_services/constants.service';
import { CustomerService } from '../../_services/customer.service';
import { DataService } from '../../_services/index';
import { StorageService } from '../../_services/index';
@Component({
  selector: 'app-customer-finance',
  templateUrl: './customer-finance.component.html',
  styleUrls: ['./customer-finance.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CustomerFinanceComponent implements OnInit {

  work = {
    OCCUPATION_ID:'',
    NET_MONTHLY_INCOME:'',
    GROSS_ANNUAL_INCOME:'',
    
  }
  currentUser: any;
  records = []; // Customer Information
  sub; // Instance of the route subscription
  @Input('userType') userType; // Type of user
  @Input('userId') userId; // User Id
  @Input('external') external = false;
  cust: any; // Customer Information
  locked = false;
  current = 0;
  showingFinancials = false;
  financialsOpen = "";
  payslips: any;
  statements = [];
  expenses: any;
  record = {
    BVN: ''
  }

  // New Model
  mainSection = true;
  subSection = 'main';
  _cust = {}
  statement_count;
  payslip_count;
  attach_dir;

  // Model for work information
  model = {
    work: { open: false, data: {}, prev: {} },
    dump: {},
  }

  // Model for updating Expense Information


  keysGetter = Object.keys;

  // uploading statement and payslip
  payslipToUpload: any = '';
  statementToUpload: any = '';

  statementData = {
    BANKSTATEMENT_START_MONTH: '',
    BANKSTATEMENT_START_YEAR: '',
    BANKSTATEMENT_END_MONTH: '',
    BANKSTATEMENT_END_YEAR: ''
  }

  payslipData = {
    PAYSLIP_START_MONTH: '',
    PAYSLIP_START_YEAR: '',
    PST_ED: '',
    PST_EY: ''
  }

  bvn = {};


  // Months
  months = [
    { value: '1', display: 'January' },
    { value: '2', display: 'Feburary' },
    { value: '3', display: 'March' },
    { value: '4', display: 'April' },
    { value: '5', display: 'May' },
    { value: '6', display: 'June' },
    { value: '7', display: 'July' }, 
    { value: '8', display: 'August' },
    { value: '9', display: 'September' },
    { value: '10', display: 'October' },
    { value: '11', display: 'November' },
    { value: '12', display: 'December' }
  ];

  source = '0';
  loading = false;
  // Driving Licence Expiry Date Selection
  startDate = 2016;
  maxDuration = new Array(16);


  openFinance(type) {

    this.financialsOpen = type;
    this.showingFinancials = true;
  }
  constructor(public route: ActivatedRoute,
    protected customersSrvc: CustomersService,
    protected constants: ConstantsService,
    public DataService: DataService,
    public customerService: CustomerService,
    public storageService: StorageService) {

  }

  // Load the basic information on navigation to this page
  ngOnInit() {
    this.currentUser = this.storageService.read<any>('currentUser');
    this.attach_dir = this.constants.read('attachments');
    if (this.external == true) {

      this.load();
    } else {
      this.sub = this.route.parent.params.subscribe(params => {
        this.userType = params["type"];
        this.userId = params["id"];
        this.load();
      });
    }

  }


  // fbvn and reload functions
  load() {

    this.customersSrvc.getFinancials(this.userType, this.userId).subscribe(data => {

      this.statements = data.bank_statments;
      this.payslips = data.payslips;
      this.cust = data.cust;
      this.record.BVN = data.cust.BVN;
      this.statement_count = data.bank_statments_count;
      this.payslip_count = data.payslips_count;

      // Load information into the expense information section
      this._cust = {
        HAS_EXTERNAL_LOAN: this.cust.HAS_EXTERNAL_LOAN,
        EXTERNAL_TOTAL_MONTHLTY_REPAYMENT: this.cust.EXTERNAL_TOTAL_MONTHLTY_REPAYMENT,
        MONTHLY_TEL_INTERNET: this.cust.MONTHLY_TEL_INTERNET,
        MONTHLY_TRANSPORT: this.cust.MONTHLY_TRANSPORT,
        MONTHLY_RENT_EXPENSES: this.cust.MONTHLY_RENT_EXPENSES,
        NUMBER_OF_DEPENDANTS: this.cust.NUMBER_OF_DEPENDANTS,
        SCHOOL_FEES_EXPENSES: this.cust.SCHOOL_FEES_EXPENSES,
        FEEDING_EXPENSES: this.cust.FEEDING_EXPENSES,
        WIFE_MONTHLY_SALARY: this.cust.WIFE_MONTHLY_SALARY
      };

      // Prepare the BVN information
      // if (this.cust.BVN_RESPONSE) {
      //   var vals = JSON.parse(this.cust.BVN_RESPONSE);
      //   if (vals['status'] == 'true') {
      //     this.bvn = vals['data']['data'];
      //   }
      // }

      // Publish section
      this.DataService.onProfileNav.emit({ 'location': 'finance', 'data': data });
    });


    // If this user is an individual, load work information.
    if (this.userType == "individual") {

      this.customersSrvc.getCustomerUpdateData(this.userType, this.userId).subscribe(data => {
        this.model.dump = data;
      });
      this.customersSrvc.getIndividualExtraData(this.userId).subscribe(data => {
        this.model.work.prev = data.work_prev;
        this.model.work.data = data.work_data;
      });
    }
  }


  nextRecords(records) {

  }
  prevRecords(records) {

  }
  getWorkStartDate(month) {
    const months = [
      {
        "display": ""
      },
      {
        "display": "January"
      },
      {
        "display": "February"
      },
      {
        "display": "March"
      },
      {
        "display": "April"
      },
      {
        "display": "May"
      },
      {
        "display": "June"
      },
      {
        "display": "July"
      },
      {
        "display": "August"
      },
      {
        "display": "September"
      },
      {
        "display": "October"
      },
      {
        "display": "November"
      },
      {
        "display": "December"
      },
    ]
    return months[month].display;
  }

  open(section) {
    this.mainSection = false;
    this.subSection = section;

    if (this.subSection == 'statement') {
      this.DataService.onProfileNav.emit({ 'location': 'statement', 'data': this.statement_count });
    } else if (this.subSection == 'payslips') {
      this.DataService.onProfileNav.emit({ 'location': 'payslip', 'data': this.payslip_count });
    } else {
      this.DataService.onProfileNav.emit({ 'location': 'home' });
    }
  }

  close() {
    this.mainSection = true;
    this.subSection = 'main';
  }


  // get the total personal expense
  get_total_personal() {
    return parseInt(this.cust.MONTHLY_RENT_EXPENSES) +
      parseInt(this.cust.MONTHLY_TRANSPORT) +
      parseInt(this.cust.MONTHLY_TEL_INTERNET)
  }

  // get total family expenses
  get_total_fam() {
    return parseInt(this.cust.SCHOOL_FEES_EXPENSES) +
      parseInt(this.cust.FEEDING_EXPENSES)
  }

  // Update Work Information
  updateWork() {
    this.model.work.data['ADDRESS'] = this.model.work.data['ADDRESS_'];
    this.model.work.data['COUNTRY_ID'] = this.model.work.data['COUNTRY_ID_'];
    this.model.work.data['STATE_ID'] = this.model.work.data['STATE_ID_'];
    this.customersSrvc.updateWork(this.model.work.data).subscribe(data => {
      if (data.status) {
        alert(data.message);
      }
    });
  }


  // Get file from Input
  getFileFromInput(event) {
    let files = event.target.files;
    let formData: any = new FormData();
    formData.append("file", files[0], files[0].name);
    return formData;
  }

  // Save Payslip
  savePayslip(event) {
    this.payslipToUpload = this.getFileFromInput(event);
  }

  // Upload Payslip
  uploadPayslip() {
    if (this.payslipToUpload == '') {
      alert("Kindly select a payslip file to upload...");
      return;
    }

    this.customersSrvc._uploadFile("customer/uploadFile/", [], this.payslipToUpload).then((data) => {
      if (data['status']) {

        // Set the data
        this.payslipData['USER_ID'] = this.userId;
        this.payslipData['RECORD_ID'] = this.cust.CURRENT_PEOPLE_WORK_ID;
        this.payslipData['DOC_TYPE'] = 3;
        this.payslipData['FILE_NAME'] = data['data']['upload_data']['file_name'];

        this.customersSrvc.uploadStatement(this.payslipData).subscribe(data => {
          if (data.status) {
            alert(data.message);
            this.load();
            this.subSection = 'payslips';
          }
        });
      }
    }, (error) => {
      console.error(error);
      alert("An error occured. File could not be uploaded.");
    });
  }

  // Save Statement
  saveStatement(event) {
    this.statementToUpload = this.getFileFromInput(event);
  }

  // Upload Statement
  uploadStatement() {
    if (this.statementToUpload == '') {
      alert("Kindly select a statement file to upload...");
      return;
    }

    // First Upload the file
    this.customersSrvc._uploadFile("customer/uploadFile/", [], this.statementToUpload).then((data) => {
      if (data['status']) {
        // Set the data
        this.statementData['USER_ID'] = this.userId;
        this.statementData['RECORD_ID'] = this.cust.CURRENT_PEOPLE_WORK_ID;
        this.statementData['DOC_TYPE'] = 4;
        this.statementData['FILE_NAME'] = data['data']['upload_data']['file_name'];

        this.customersSrvc.uploadStatement(this.statementData).subscribe(data => {
          if (data.status) {
            alert(data.message);
            this.load();
            this.subSection = 'statement';
          }
        });
      }
    }, (error) => {
      console.error(error);
      alert("An error occured. File could not be uploaded.");
    });
  }


  // Update Expenses
  updateExpense() {
    this._cust['user'] = this.userId;
    this.customersSrvc.updateExpense(this._cust).subscribe(data => {
      if (data.status) {
        alert(data.message);
        this.load();
        this.subSection = 'expense';
      }
    });
  }
  retryBVNValidation(cust) {
    this.source = '2';
    this.loading = true;
    this.cust.BVN = this.record.BVN;
    this.customerService.retryBVNValidation(this.currentUser.token, cust).subscribe(data => {
      this.loading = false;
      this.load();
    });
  }
  clearBVNRecord(cust) {
    this.source = '1';
    this.loading = true;
    this.customerService.clearBVNRecord(this.currentUser.token, cust).subscribe(data => {
      this.loading = false;
      this.load();
    });
  }
}
