import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { OptionsserviceService, LoansService, StorageService } from '../_services/index'; 
import { Loan } from '../_interfaces/loan.interface';
import { Loan_ } from '../_models/loan_';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomersService } from '../_services/customers.service';
import { DataService} from '../_services/index'; 
@Component({
  selector: 'app-loanguarantors',
  templateUrl: './loanguarantors.component.html',
  styleUrls: ['./loanguarantors.component.css']
})
export class LoanguarantorsComponent implements OnInit {
  public gprofile:any;
  public parentRouteId: number;
  public sub: any;
  public loading = false;
  state:any;
  @Input('guarantors') guarantors: any;
  @Input('fromcustomer') fromcustomer = 0;
  @Input('gua_count') gua_count = 0;
  public currentUser: any;
  public guarantorOpen = 0;
  @Input('showGuarantorList') showGuarantorList = true;
  searchingGuarantors = false;
  addGuarantors = false;
  public guarantors_summary: any;
  items = [];
  guarantor_profile: any;
  // Models
  model = {
    basicInfo: { open: true, data: {}, prev: {} },
    address: { open: false, data: {}, prev: {} },
    work: { open: false, data: {}, prev: {} },
    id: { open: false, data: {}, prev: {} },
    nok: { open: false, data: {}, prev: {} },
    director: { open: false, data: {}, prev: {} },
    phone: { open: false, data: {}, prev: {} },
    edu: { open: false, data: {}, prev: {} },
    dump: {},
    individualExtra: {}
  }

  last_updated;
  userType = "individual"; // Type of user
  userId; // User Id
  external = false;
  resp = []
  resp_ = []
  // Select Options
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
  edu_levels = [];
  cust: any; // Customer Information
  locked = false;
  current = 0;
  showingFinancials = false;
  financialsOpen = "";
  payslips: any;
  statements = [];
  expenses: any;
  _cust = {}
  statement_count;
  payslip_count;
  attach_dir;
  bvn;
  loan_product:any;
  constructor(protected customersSrvc: CustomersService,private DataService: DataService, public route: ActivatedRoute, 
    public storageService: StorageService, 
    public optionsService: OptionsserviceService, public loansService: LoansService) {
  }

  ngOnInit() {

    if (this.fromcustomer != 1) {
      this.currentUser = this.storageService.read<any>('currentUser');
      this.sub = this.route.parent.params.subscribe(params => {
        this.parentRouteId = +params["id"];
        this.loadData()
      });
    }

  }
  loadData() {
    this.loansService.getLoanGuarantors(this.currentUser.token, this.parentRouteId)
      .subscribe(guarantors => {
        this.loading = false;
        this.addGuarantors = false;
        this.searchingGuarantors = false;
        this.guarantors = guarantors.data;
        this.guarantors_summary = guarantors.summary;
        this.gua_count = guarantors.gua_count;
        this.loan_product = guarantors.loan_product;
      });
  }
  search_for_guarantors() {

  }
  openGuarantor(RG_ID) {
    this.guarantorOpen = RG_ID;
  }
  showGuarantorLists() {
    this.loading = false;
    this.showGuarantorList = true;
  }
  someMethod(event) {
    this.showGuarantorList = false;
    this.loading = true;
    this.loansService.getLoanGuarantorProfile(this.currentUser.token, event, "individual")
      .subscribe(data => {
        let details = data.data.guarantor.details;
        this.loading = false;

        // Store in the model to be viewed on the front
        this.model.basicInfo.prev = details.basic;
        this.model.address.prev = details.address;
        this.model.work.prev = details.work;
        this.gprofile = data;
 
      });
 
  }
  public isValidMailFormat(control: FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return {
        'startsWithAt@': true
      };
    }

    return null;
  }
  public onValidationError(item) {
    console.log('invalid email ' + item);
  }
  public validators = [this.isValidMailFormat];

  public errorMessages = {
    'startsWithAt@': 'Only valid email addresses are allowed',
  };
  sendGuarantorInvites() {
    this.loading = true;
    this.loansService.sendGuarantorInvites(this.currentUser.token, this.parentRouteId, this.items)
      .subscribe(guarantors => {

        this.loadData()
      });
  }

  accept_guarantor(){
    alert('Accepting Guarantor');
  }

  reject_guarantor(){
    alert('Reject Guarantor');
  }
  requestForCard(){
    this.DataService.onOpenLoanChildModal.emit({'location': 'request_card_guarantor', data : this.gprofile});
  }
}
